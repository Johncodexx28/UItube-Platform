import React from 'react';
import { 
  PlayCircle, 
  CheckCircle, 
  Award, 
  Users, 
  Monitor, 
  Layers, 
  Clock, 
  ChevronRight,
  PlusSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import TeacherDashboard from './TeacherDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (user?.role === 'Teacher') {
    return <TeacherDashboard />;
  }

  return <StudentDashboard user={user} />;
};

const StudentDashboard = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
        
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<PlayCircle className="w-5 h-5 text-orange-500" />}
            label="Course in Progress"
            value="0"
          />
          <StatCard 
            icon={<CheckCircle className="w-5 h-5 text-green-500" />}
            label="Course Completed"
            value="0"
          />
          <StatCard 
            icon={<Award className="w-5 h-5 text-blue-500" />}
            label="Certificates Earned"
            value="0"
          />
          <StatCard 
            icon={<Users className="w-5 h-5 text-orange-400" />}
            label="Community Support"
            value="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Courses You're Taking */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course You're Taking</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase font-medium border-b border-gray-100">
                    <th className="pb-4 font-medium">Course Title</th>
                    <th className="pb-4 font-medium">Lessons Completed</th>
                    <th className="pb-4 font-medium">Duration</th>
                    <th className="pb-4 font-medium">Instructor</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* Highlighted Video-based course */}
                  <tr className="border-b border-gray-50 bg-blue-50/50">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user?.course || 'No course assigned yet'}</p>
                        <p className="text-xs text-blue-600 font-medium">Assigned Teacher Video</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-semibold text-gray-800">0/0 (0%)</p>
                    </td>
                    <td className="py-4 text-gray-600 font-medium">0h 0m 0s</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="font-semibold text-gray-800">TBD</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended for you */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recommended for you</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RecommendedCard 
                category="HTML"
                title="Front-end Development"
                lessons="30 Lessons | 83 Hours"
                bgColor="bg-lime-100"
              />
              <RecommendedCard 
                category="Search Engine"
                title="SEO Experts from Zero"
                lessons="25 Lessons | 18 Hours"
                bgColor="bg-blue-100"
              />
              <RecommendedCard 
                category="UI Design"
                title="Learn Creative Design"
                lessons="35 Lessons | 95 Hours"
                bgColor="bg-orange-100"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
          {/* Upcoming Tests */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Tests</h2>
            <div className="space-y-4 mb-6">
              <TestItem icon={<Monitor />} bg="bg-pink-100" color="text-pink-600" title="Basic Computer" subtitle="Class Test 5" date="15 May" />
              <TestItem icon={<Layers />} bg="bg-orange-100" color="text-orange-600" title="UIUX Design" subtitle="Class Test 2" date="22 May" />
              <TestItem icon={<Award />} bg="bg-blue-100" color="text-blue-600" title="English Language" subtitle="Class Test 1" date="24 May" />
              <TestItem icon={<Clock />} bg="bg-yellow-100" color="text-yellow-600" title="Time Management" subtitle="Class Test 3" date="29 May" />
            </div>
            <button className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
              See All Upcoming Tests
            </button>
          </div>

          {/* Community Groups */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Community Groups</h2>
              <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                <PlusSquare className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <GroupItem bg="bg-emerald-600" initial="D" title="Design Community, USA" subtitle="112K Members" />
              <GroupItem bg="bg-purple-600" initial="S" title="SEO Helpline 24/7" subtitle="78K Members" />
              <GroupItem bg="bg-gray-900" initial="U" title="UIUX Worldwide" subtitle="498K Members" />
              <GroupItem bg="bg-blue-600" initial="U" title="UI Hunter" subtitle="212K Members" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      <div className="bg-gray-50 p-1.5 rounded-lg">{icon}</div>
      <span className="text-gray-400 font-medium text-sm">{label}</span>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
  </div>
);

const RecommendedCard = ({ category, title, lessons, bgColor }) => (
  <div className="bg-white border text-left border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">
    <div className={`h-36 ${bgColor} flex items-center justify-center p-6 relative`}>
      {/* Decorative inner element mock */}
      <div className="bg-white/50 w-full h-full rounded-xl backdrop-blur-sm border border-white/60"></div>
    </div>
    <div className="p-5 flex flex-col flex-1 text-left">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">{category}</span>
      <h3 className="text-gray-900 font-bold leading-tight mb-2 text-md">{title}</h3>
      <p className="text-gray-400 text-xs font-medium mb-5">{lessons}</p>
      <div className="mt-auto">
        <button className="w-full text-center border-2 border-indigo-50 text-indigo-600 font-bold py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
          Enroll Now
        </button>
      </div>
    </div>
  </div>
);

const TestItem = ({ icon, bg, color, title, subtitle, date }) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">{subtitle}</span>
          <span className="text-orange-500 font-medium">{date}</span>
        </div>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
  </div>
);

const GroupItem = ({ bg, initial, title, subtitle }) => (
  <div className="flex items-center justify-between hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-2xl ${bg} text-white flex items-center justify-center font-bold text-xl`}>
        {initial}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{title}</h4>
        <span className="text-gray-400 text-xs font-medium">{subtitle}</span>
      </div>
    </div>
  </div>
);

export default Dashboard;
