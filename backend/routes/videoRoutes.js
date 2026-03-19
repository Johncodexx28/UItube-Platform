import express from 'express';
import { 
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  getMyVideos,
  getCourses
} from '../controllers/videoController.js';
import { protect, teacher } from '../middleware/authMiddleware.js';

const router = express.Router();

// Video Routes
router.route('/')
  .post(protect, teacher, uploadVideo)
  .get(getAllVideos);

router.get('/my-videos', protect, teacher, getMyVideos);

router.get('/courses', getCourses);

router.get('/:id', getVideoById);

router.post('/:id/like', protect, likeVideo);

export default router;
