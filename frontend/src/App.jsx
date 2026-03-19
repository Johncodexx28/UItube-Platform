import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MyClass from './pages/MyClass';
import VideoPlayer from './pages/VideoPlayer';
import TeacherProfile from './pages/TeacherProfile';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Messages from './pages/Messages';
import Instructors from './pages/Instructors';
import Settings from './pages/Settings';
import UnderDevelopment from './pages/UnderDevelopment';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
        <Routes>
          {/* Public Routes without layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/forgot-password" element={<AuthPage />} />
          <Route path="/reset-password" element={<AuthPage />} />
          
          {/* Main App Routes (Protected) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/my-class" element={<MyClass />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/my-lessons" element={<UnderDevelopment title="My Lessons" />} />
              <Route path="/assignments" element={<UnderDevelopment title="Assignments" />} />
              <Route path="/reports" element={<UnderDevelopment title="Analytics" />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/teacher/:id" element={<TeacherProfile />} />
              
              {/* Redirect legacy /feed to /dashboard */}
              <Route path="/feed" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
