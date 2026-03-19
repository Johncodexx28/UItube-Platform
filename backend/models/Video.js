import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  visibility: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Public'
  },
  assignedSections: [{
    type: String
  }]
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
