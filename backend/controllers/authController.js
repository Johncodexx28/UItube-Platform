import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateCode, sendVerificationEmail } from '../utils/sendEmail.js';

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod', {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate verification code
    const verificationCode = generateCode();

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Student',
      isVerified: false,
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    if (user) {
      // Send verification email
      await sendVerificationEmail(email, verificationCode);

      // Don't issue JWT yet — require email verification first
      res.status(201).json({
        needsVerification: true,
        email: user.email,
        message: 'Registration successful! Please check your email for a verification code.',
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      // Block login if email is not verified
      if (!user.isVerified) {
        return res.status(403).json({
          message: 'Please verify your email before logging in.',
          needsVerification: true,
          email: user.email,
        });
      }

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
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        course: user.course,
        yearLevel: user.yearLevel,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, role, course, yearLevel } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (course) updateData.course = course;
    if (yearLevel) updateData.yearLevel = yearLevel;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { returnDocument: 'after', runValidators: true }
    );

    if (updatedUser) {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        course: updatedUser.course,
        yearLevel: updatedUser.yearLevel,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
