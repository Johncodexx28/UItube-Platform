import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dns from "dns";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import Course from "./models/Course.js";

dotenv.config();

// Fix for querySrv ECONNREFUSED - use Google's public DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// 1. Middleware
app.use(express.json());
app.use(cookieParser());

// 2. CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  /\.vercel\.app$/,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((allowed) => {
      if (typeof allowed === "string") return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("Origin not allowed by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Required for cookies/sessions
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  optionsSuccessStatus: 200,
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// 3. Handle Preflight requests globally
// This is CRITICAL for Vercel deployments
app.options("*", cors(corsOptions));

// 4. Database Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("MONGODB_URI not found in .env, skipping DB connection.");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");
    seedCourses();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

const seedCourses = async () => {
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.create([
        {
          name: "Computer Science",
          description: "Core CS concepts and coding",
        },
        {
          name: "Web Development",
          description: "HTML, CSS, JS and frameworks",
        },
        { name: "UI/UX Design", description: "Design principles and tools" },
        { name: "Digital Marketing", description: "SEO, SEM and social media" },
      ]);
      console.log("Default courses seeded!");
    }
  } catch (err) {
    console.error("Error seeding courses:", err.message);
  }
};

connectDB();

// 5. Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("UITUBE API is running...");
});

// 6. Server Export/Listen
const PORT = process.env.PORT || 5000;

// If deploying as a Vercel Serverless function, we export the app
// Otherwise, we listen on the port
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
