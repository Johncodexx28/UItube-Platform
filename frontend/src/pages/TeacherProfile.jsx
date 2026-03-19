import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Bell } from 'lucide-react';

const TeacherProfile = () => {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock teacher data
  const teacher = {
    id: id,
    name: 'Mosh Hamedani',
    subscribers: '250K',
    courses: ['Computer Science', 'Web Development'],
    about: 'Passionate educator teaching software engineering to millions of students worldwide.',
    videos: [
      { id: 'v1', title: 'React Crash Course for Beginners 2024', teacherId: id, teacherName: 'Mosh Hamedani', views: '1.2M', createdAt: '2 months ago', duration: '1:45:00' },
      { id: 'v4', title: 'Node.js & Express API Development', teacherId: id, teacherName: 'Mosh Hamedani', views: '800k', createdAt: '5 months ago', duration: '2:12:00' },
      { id: 'v7', title: 'Python for Data Science', teacherId: id, teacherName: 'Mosh Hamedani', views: '3M', createdAt: '1 year ago', duration: '6:00:00' },
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Banner */}
      <div className="w-full h-32 sm:h-48 md:h-64 bg-linear-to-r from-blue-600 to-indigo-800"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-12 sm:-mt-16 md:-mt-20 mb-8 pb-8 border-b border-gray-200">
          <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden shadow-md">
            <span className="text-4xl sm:text-6xl text-blue-700 font-bold bg-blue-100 w-full h-full flex items-center justify-center">
              {teacher.name[0]}
            </span>
          </div>
          
          <div className="flex-1 text-center md:text-left pt-2 md:pt-24 md:pl-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{teacher.name}</h1>
            <div className="text-gray-500 text-sm mt-1 sm:mt-2 space-y-1 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center md:justify-start">
              <span>{teacher.subscribers} subscribers</span>
              <span className="hidden sm:inline">•</span>
              <span>{teacher.videos.length} videos</span>
            </div>
            <p className="text-gray-700 mt-4 max-w-2xl text-sm sm:text-base">{teacher.about}</p>
          </div>
          
          <div className="md:pt-24 mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
             <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`px-6 py-2 rounded-full font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 ${
                  isSubscribed 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="h-4 w-4 fill-current" /> Subscribed
                  </>
                ) : 'Subscribe'}
              </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Uploaded Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teacher.videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
