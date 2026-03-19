import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const OnboardingModal = () => {
  const { user, updateUser } = useAuth();
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Show modal if user is logged in, is a student, and hasn't filled info
    if (user && user.role === 'Student' && !user.course) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user]);

  // If not logged in, or already has course and yearLevel, or is a Teacher, don't show.
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course || !yearLevel) return;

    setIsSubmitting(true);
    try {
      await updateUser({ course, yearLevel });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update onboarding info:', error);
      alert('Failed to save your info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to UItube!</h2>
          <p className="text-gray-500 text-sm">Please tell us a bit more about yourself to personalize your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Course / Major</label>
            <select 
              value={course} 
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none"
              required
            >
              <option value="" disabled>Select your course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Arts & Design">Arts & Design</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
            <select 
              value={yearLevel} 
              onChange={(e) => setYearLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none"
              required
            >
              <option value="" disabled>Select year level</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-md mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;
