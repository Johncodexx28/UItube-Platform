import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateCode, sendVerificationEmail, sendPasswordResetEmail } from '../utils/sendEmail.js';

// Helper: generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod', {
    expiresIn: '30d',
  });
};

// @desc    Verify email with code
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email }).select('+verificationCode +verificationCodeExpires');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    if (!user.verificationCode || user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
    }

    // Mark as verified and clear code
    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      $unset: { verificationCode: '', verificationCodeExpires: '' },
    });

    // Issue JWT cookie
    const token = generateToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      course: user.course,
      yearLevel: user.yearLevel,
      isVerified: true,
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Resend verification code
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    const code = generateCode();

    await User.findByIdAndUpdate(user._id, {
      verificationCode: code,
      verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await sendVerificationEmail(email, code);

    res.json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send password reset code
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal whether user exists
      return res.json({ message: 'If an account with that email exists, a reset code has been sent.' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first before resetting your password.' });
    }

    const code = generateCode();

    await User.findByIdAndUpdate(user._id, {
      resetPasswordCode: code,
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await sendPasswordResetEmail(email, code);

    res.json({ message: 'If an account with that email exists, a reset code has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset password with code
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email }).select('+resetPasswordCode +resetPasswordExpires +password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    if (!user.resetPasswordCode || user.resetPasswordCode !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    // Update password (will trigger pre-save hook to hash it)
    user.password = newPassword;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully. You can now login.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
