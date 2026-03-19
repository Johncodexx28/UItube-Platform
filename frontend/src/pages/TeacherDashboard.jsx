import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Video as VideoIcon, 
  Users, 
  BarChart3, 
  MoreVertical, 
  Trash2, 
  Edit,
  ExternalLink,
  Loader2,
  Play,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import UploadModal from '../components/UploadModal';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchMyVideos = async () => {
    try {
      setLoading(true);
      const data = await api.get('/videos/my-videos');
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVideos();
  }, []);

  const totalViews = (videos || []).reduce((acc, video) => acc + (video.views || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-[40px] bg-gray-900 p-8 md:p-12 text-white shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-indigo-500/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold uppercase tracking-widest">
              Teacher Workspace Pro
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Inspire your <span className="text-indigo-400">Section</span> today.
            </h1>
            <p className="text-gray-400 max-w-md font-medium text-lg leading-relaxed">
              Managing {videos.length} lessons across your courses. Your students are waiting for new content!
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              Upload New Lesson
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid - High End Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCardV2 
          icon={<VideoIcon className="w-6 h-6" />}
          label="Active Lessons"
          value={videos.length}
          trend="+2 this week"
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCardV2 
          icon={<LayoutDashboard className="w-6 h-6" />}
          label="Course Impact"
          value={`${totalViews.toLocaleString()}`}
          trend="Top 5% of teachers"
          gradient="from-fuchsia-500 to-primary"
        />
        <StatCardV2 
          icon={<Users className="w-6 h-6" />}
          label="Total Students"
          value="1.2k"
          trend="+12% growth"
          gradient="from-orange-400 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: Lessons List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Lessons</h2>
            <button className="text-indigo-600 font-bold hover:underline">View All</button>
          </div>

          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center text-gray-400 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="font-black text-xs uppercase tracking-widest">Hydrating data...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="py-24 text-center px-8">
                <div className="inline-flex w-20 h-20 bg-gray-50 rounded-3xl items-center justify-center mb-6 text-gray-200">
                  <VideoIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Content Yet</h3>
                <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                  Your workspace is currently empty. Start by uploading your first professional video lesson.
                </p>
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-gray-200"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {videos.map((video) => (
                  <div key={video._id} className="group p-6 hover:bg-gray-50/50 transition-all flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="w-32 h-20 rounded-2xl bg-gray-100 overflow-hidden relative shrink-0 border border-gray-100 shadow-sm transition-transform group-hover:scale-[1.02]">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Play className="w-8 h-8 fill-current" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-tighter italic">
                            {video.courseId?.name || 'General'}
                          </span>
                          {video.visibility === 'Private' && (
                             <span className="px-2 py-0.5 rounded-md bg-gray-900 text-white text-[10px] font-black uppercase tracking-tighter italic">
                              Private
                             </span>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-primary transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-sm font-medium text-gray-400 mt-1 flex items-center gap-2">
                           {video.views} views • {new Date(video.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 bg-white text-gray-400 hover:text-primary rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-110">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-110">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Insights & Actions */}
        <div className="space-y-10">
           <div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6 px-2">Assistant</h2>
             <div className="bg-primary rounded-[40px] p-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-xl font-black mb-3 text-white">Action Required</h3>
                <p className="text-primary-foreground/80 font-medium text-sm leading-relaxed mb-6">
                  You have 12 unassigned students in Section B. Assign them to a course to track their progress.
                </p>
                <button className="w-full py-4 bg-white text-primary font-black rounded-2xl shadow-lg shadow-black/10 hover:bg-indigo-50 transition-all">
                  Assign Now
                </button>
             </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6">Engagement Overview</h3>
              <div className="space-y-6 text-sm font-black uppercase tracking-widest text-gray-400">
                 <div className="flex justify-between items-center">
                    <span>Average Duration</span>
                    <span className="text-gray-900">12:45s</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[65%]"></div>
                 </div>

                 <div className="flex justify-between items-center">
                    <span>Retention Rate</span>
                    <span className="text-gray-900">82%</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[82%]"></div>
                 </div>

                 <div className="flex justify-between items-center">
                    <span>Quiz Completion</span>
                    <span className="text-gray-900">45%</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 w-[45%]"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onSuccess={fetchMyVideos} 
      />
    </div>
  );
};

const StatCardV2 = ({ icon, label, value, trend, gradient }) => (
  <div className="group relative bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${gradient} opacity-0 group-hover:opacity-5 rounded-bl-[100px] transition-all duration-500`}></div>
    <div className="relative z-10">
      <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white shadow-lg shadow-indigo-200 mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-gray-400 font-black text-xs uppercase tracking-widest mb-1">{label}</p>
      <div className="text-4xl font-black text-gray-900 tracking-tighter">{value}</div>
      <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">
         {trend}
      </p>
    </div>
  </div>
);

export default TeacherDashboard;
