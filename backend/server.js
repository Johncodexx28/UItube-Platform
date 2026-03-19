import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dns from 'dns';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

// Fix for querySrv ECONNREFUSED - use Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Database Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('MONGODB_URI not found in .env, skipping DB connection for now.');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
    
    // Seed default data
    seedCourses();  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    // Don't exit process so server can still start without DB for now
  }
};

import Course from './models/Course.js';

const seedCourses = async () => {
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.create([
        { name: 'Computer Science', description: 'Core CS concepts and coding' },
        { name: 'Web Development', description: 'HTML, CSS, JS and frameworks' },
        { name: 'UI/UX Design', description: 'Design principles and tools' },
        { name: 'Digital Marketing', description: 'SEO, SEM and social media' },
      ]);
      console.log('Default courses seeded!');
    }
  } catch (err) {
    console.error('Error seeding courses:', err.message);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('UITUBE API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
