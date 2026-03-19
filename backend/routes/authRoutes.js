import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import {
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
} from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Email verification & password reset (public)
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
