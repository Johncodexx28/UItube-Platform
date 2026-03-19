import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ThumbsUp, BookmarkPlus, Share2, Bell, 
  PlayCircle, CheckCircle, Clock, FileText, Download, User
} from 'lucide-react';
import { useVideoContext } from '../context/VideoContext';

const MOCK_MODULES = [
  {
    id: 'm1',
    title: '1. Getting Started with React',
    duration: '45 mins',
    videos: [
      { id: 'v1', title: 'Welcome to the Course', duration: '5:20', completed: true },
      { id: 'v2', title: 'What is React?', duration: '12:45', completed: true },
      { id: 'v3', title: 'Setting up the Environment', duration: '15:10', completed: false, active: true },
      { id: 'v4', title: 'Your First React App', duration: '22:30', completed: false },
    ]
  },
  {
    id: 'm2',
    title: '2. React Components & Props',
    duration: '1h 15 mins',
    videos: [
      { id: 'v5', title: 'Understanding Components', duration: '18:00', completed: false },
      { id: 'v6', title: 'Props Explained', duration: '25:15', completed: false },
      { id: 'v7', title: 'Component Composition', duration: '14:20', completed: false },
    ]
  },
  {
    id: 'm3',
    title: '3. State & Lifecycle',
    duration: '2h 30 mins',
    videos: [
      { id: 'v8', title: 'What is State?', duration: '20:00', completed: false },
      { id: 'v9', title: 'useState Hook', duration: '35:45', completed: false },
      { id: 'v10', title: 'useEffect Hook', duration: '40:10', completed: false },
    ]
  }
];

const VideoPlayer = () => {
  const { id } = useParams();
  const { isSaved, saveVideo, unsaveVideo } = useVideoContext();
  const [likes, setLikes] = useState(12400);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState(['m1', 'm2']);

  // Mock video data
  const video = {
    id: id,
    title: 'Setting up the Environment',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    teacherId: 't1',
    teacherName: 'Mosh Hamedani',
    views: '1.2M',
    createdAt: '2 months ago',
    description: 'Learn React from scratch in this comprehensive tutorial. We will cover components, state, props, hooks, and much more.\n\nIn this specific lesson, we will look at how to set up your local development environment using Vite and Node.js.',
    course: 'React Crash Course for Beginners 2024'
  };

  const saved = isSaved(video.id);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(l => l - 1);
      setHasLiked(false);
    } else {
      setLikes(l => l + 1);
      setHasLiked(true);
    }
  };

  const handleSaveToggle = () => {
    saved ? unsaveVideo(video.id) : saveVideo(video);
  };

  const toggleModule = (modId) => {
    setExpandedModules(prev => 
      prev.includes(modId) ? prev.filter(m => m !== modId) : [...prev, modId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* LEFT COLUMN: Main Video Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb / Course Title */}
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500">
            <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{video.course}</span>
          </div>

          {/* Video Player */}
          <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden mb-6 shadow-xl border border-gray-800">
            <video 
              src={video.videoUrl} 
              controls 
              className="w-full h-full object-contain"
              autoPlay
              muted
            />
          </div>

          {/* Video Title & Actions */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Instructor snippet */}
              <div className="flex items-center gap-4">
                <Link to={`/teacher/${video.teacherId}`} className="shrink-0 group">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                    {video.teacherName[0]}
                  </div>
                </Link>
                <div>
                  <Link to={`/teacher/${video.teacherId}`} className="font-bold text-gray-900 hover:text-indigo-600 text-lg block line-clamp-1 transition-colors">
                    {video.teacherName}
                  </Link>
                  <span className="text-sm text-gray-500 font-medium">Instructor</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border shadow-sm ${
                    hasLiked ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} /> 
                  {hasLiked ? 'Liked' : 'Like'} ({likes.toLocaleString()})
                </button>
                
                <button 
                  onClick={handleSaveToggle}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border shadow-sm ${
                    saved ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookmarkPlus className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} /> 
                  {saved ? 'Saved' : 'Save'}
                </button>

                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 xl:mb-0">
            <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto scrollbar-hide">
              {['overview', 'instructor', 'resources'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-bold text-sm capitalize whitespace-nowrap transition-colors relative ${
                    activeTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[200px]">
              {activeTab === 'overview' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">About this lesson</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {video.description}
                  </p>
                  
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Duration</div>
                      <div className="font-bold text-gray-900">15:10</div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <PlayCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Views</div>
                      <div className="font-bold text-gray-900">{video.views}</div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <User className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Skill Level</div>
                      <div className="font-bold text-gray-900">Beginner</div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Certificates</div>
                      <div className="font-bold text-gray-900">Yes</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="animate-in fade-in duration-300 flex flex-col md:flex-row gap-6 items-start">
                  <img src="https://ui-avatars.com/api/?name=Mosh+Hamedani&background=random&size=128" alt="Instructor" className="w-32 h-32 rounded-3xl object-cover shadow-md" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{video.teacherName}</h3>
                    <p className="text-indigo-600 font-medium text-sm mb-4">Senior Software Engineer & Educator</p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Mosh is a software engineer with two decades of experience. He's passionate about teaching and has helped millions of people worldwide learn how to code through his YouTube channel and online courses.
                    </p>
                    <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Course Slides (PDF)</h4>
                          <p className="text-xs text-gray-500">2.4 MB</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Starter Code (ZIP)</h4>
                          <p className="text-xs text-gray-500">14.8 MB</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Course Playlist Sidebar */}
        <div className="xl:w-[400px] shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Course Content</h2>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">25% Completed (2/8 Videos)</p>
            </div>
            
            <div className="max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
              {MOCK_MODULES.map(module => {
                const isExpanded = expandedModules.includes(module.id);
                return (
                  <div key={module.id} className="border-b border-gray-100 last:border-0">
                    <button 
                      onClick={() => toggleModule(module.id)}
                      className="w-full text-left p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{module.title}</h3>
                        <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
                          <span>{module.videos.length} Lectures</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-gray-50 py-2">
                        {module.videos.map(v => (
                          <Link 
                            to={`/video/${v.id}`} 
                            key={v.id} 
                            className={`flex items-start gap-3 p-3 mx-2 rounded-xl transition-all ${
                              v.active ? 'bg-indigo-100/50 shadow-sm border border-indigo-100/50' : 'hover:bg-gray-100 border border-transparent cursor-pointer'
                            }`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {v.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : v.active ? (
                                <PlayCircle className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold truncate ${
                                v.active ? 'text-indigo-900' : 'text-gray-700'
                              }`}>{v.title}</h4>
                              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mt-1">
                                <Clock className="w-3.5 h-3.5" />
                                {v.duration}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
