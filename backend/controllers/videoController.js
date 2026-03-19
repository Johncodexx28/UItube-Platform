import Video from '../models/Video.js';
import Course from '../models/Course.js';

// @desc    Upload a new video
// @route   POST /api/videos
// @access  Private/Teacher
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, courseId, visibility, assignedSections } = req.body;

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      courseId: courseId || undefined,
      visibility: visibility || 'Public',
      assignedSections: assignedSections || [],
      teacherId: req.user._id,
    });

    res.status(201).json(video);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading video' });
  }
};

// @desc    Get all videos (with filtering for students)
// @route   GET /api/videos
// @access  Public
export const getAllVideos = async (req, res) => {
  try {
    const { courseId } = req.query;
    let query = {};

    // Base filter: if student, only show Public OR their section/course
    if (req.user && req.user.role === 'Student') {
      query = {
        $or: [
          { visibility: 'Public' },
          { 
            visibility: 'Private', 
            $or: [
              { assignedSections: req.user.section },
              { courseId: req.user.courseId } // Assuming we might want course-level private too
            ]
          }
        ]
      };
    }

    if (courseId) {
      query.courseId = courseId;
    }

    const videos = await Video.find(query)
      .populate('teacherId', 'name')
      .populate('courseId', 'name')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

// @desc    Get teacher's own videos
// @route   GET /api/videos/my-videos
// @access  Private/Teacher
export const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ teacherId: req.user._id })
      .populate('courseId', 'name')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    console.error('Get my videos error:', error);
    res.status(500).json({ message: 'Error fetching your videos' });
  }
};

// @desc    Get video by ID
// @route   GET /api/videos/:id
// @access  Public
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('teacherId', 'name')
      .populate('courseId', 'name');

    if (video) {
      // Privacy check
      if (video.visibility === 'Private') {
        const isTeacher = req.user && req.user._id.toString() === video.teacherId._id.toString();
        const isAdmin = req.user && req.user.role === 'Admin';
        const isAssignedStudent = req.user && req.user.role === 'Student' && video.assignedSections.includes(req.user.section);

        if (!isTeacher && !isAdmin && !isAssignedStudent) {
          return res.status(403).json({ message: 'This lesson is private and not assigned to you' });
        }
      }

      // Increment views
      video.views += 1;
      await video.save();
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Error fetching video' });
  }
};

// @desc    Like a video
// @route   POST /api/videos/:id/like
// @access  Private
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (video) {
      // Privacy check
      if (video.visibility === 'Private') {
        const isTeacher = req.user && req.user._id.toString() === video.teacherId.toString();
        const isAdmin = req.user && req.user.role === 'Admin';
        const isAssignedStudent = req.user && req.user.role === 'Student' && video.assignedSections.includes(req.user.section);

        if (!isTeacher && !isAdmin && !isAssignedStudent) {
          return res.status(403).json({ message: 'You cannot interact with this private lesson' });
        }
      }

      const alreadyLiked = video.likes.includes(req.user._id);

      if (alreadyLiked) {
        video.likes = video.likes.filter((id) => id.toString() !== req.user._id.toString());
      } else {
        video.likes.push(req.user._id);
      }

      await video.save();
      res.json({ message: alreadyLiked ? 'Unliked' : 'Liked', likes: video.likes.length });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ message: 'Error liking video' });
  }
};
// @desc    Get all courses
// @route   GET /api/videos/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ name: 1 });
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};
