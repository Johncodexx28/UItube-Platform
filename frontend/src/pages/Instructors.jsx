import React from 'react';
import { 
  Users, 
  Star, 
  MessageSquare, 
  Play, 
  Award, 
  Linkedin, 
  Twitter, 
  ChevronRight,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Instructors = () => {
  const { user } = useAuth();

  const instructors = [
    { 
      id: 1, 
      name: 'Dr. Sarah Wilson', 
      role: 'UI/UX Design Specialist', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 
      students: '12.4k', 
      courses: 8, 
      rating: 4.9,
      bio: 'Ex-Google Designer with 10+ years of experience in creating digital products that users love.',
      topSkills: ['User Experience', 'Figma', 'Systemic Thinking']
    },
    { 
      id: 2, 
      name: 'Prof. Michael Chen', 
      role: 'Senior Web Developer', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', 
      students: '45.1k', 
      courses: 15, 
      rating: 4.8,
      bio: 'Full-stack architect specializing in React, Node.js, and scalable cloud infrastructure.',
      topSkills: ['React', 'Next.js', 'Node.js']
    },
    { 
      id: 3, 
      name: 'Emma Thompson', 
      role: 'Brand Identity Expert', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', 
      students: '8.2k', 
      courses: 6, 
      rating: 4.9,
      bio: 'Helping global brands tell their stories through visual identity and motion graphics.',
      topSkills: ['Logo Design', 'Motion', 'Illustration']
    },
    { 
      id: 4, 
      name: 'James Rodriguez', 
      role: 'Motion Graphics Artist', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', 
      students: '5.6k', 
      courses: 4, 
      rating: 4.7,
      bio: 'Bringing static designs to life with advanced After Effects techniques and 3D modeling.',
      topSkills: ['After Effects', 'Blender', 'Premiere Pro']
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
            Our <span className="text-primary italic">Instructors</span>
          </h1>
          <p className="text-gray-500 font-medium bg-gray-50 inline-block px-5 py-2 rounded-[20px] border border-gray-100 text-sm">
            Learn from industry leaders and professional educators
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-3 rounded-[32px] shadow-sm border border-gray-100 max-w-sm w-full">
           <Search className="w-5 h-5 text-gray-400 ml-2" />
           <input 
             type="text" 
             placeholder="Search instructors by name or skill..." 
             className="flex-1 bg-transparent border-none py-2 px-2 font-bold text-gray-900 outline-none text-sm placeholder:text-gray-300"
           />
           <button className="p-2 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-50">
             <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <TrendingUp className="w-6 h-6" />, label: "Engagement Hub", color: "bg-indigo-50 text-indigo-600", desc: "Top 1% rated instructors globally" },
          { icon: <Award className="w-6 h-6" />, label: "Certified Expertise", color: "bg-emerald-50 text-emerald-600", desc: "Verified industry certifications" },
          { icon: <MessageSquare className="w-6 h-6" />, label: "Direct Mentorship", color: "bg-orange-50 text-orange-600", desc: "Daily active support & feedback" },
        ].map((feat, i) => (
          <div key={i} className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all group">
            <div className={`w-14 h-14 rounded-2xl ${feat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
              {feat.icon}
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">{feat.label}</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Instructor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {instructors.map((inst) => (
          <div key={inst.id} className="group bg-white rounded-[48px] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-64 h-80 rounded-[40px] overflow-hidden relative group-hover:shadow-2xl transition-all">
              <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-gray-400 hover:text-indigo-600 transition-all">
                    <Linkedin className="w-4 h-4" />
                 </button>
                 <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-gray-400 hover:text-sky-500 transition-all">
                    <Twitter className="w-4 h-4" />
                 </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex justify-between items-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <div className="flex items-center gap-1.5 text-white">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-black text-sm">{inst.rating}</span>
                 </div>
                 <div className="h-4 w-px bg-white/20"></div>
                 <div className="flex items-center gap-1.5 text-white">
                    <Users className="w-4 h-4" />
                    <span className="font-black text-sm">{inst.students}</span>
                 </div>
              </div>
            </div>

            <div className="flex-1 p-8 flex flex-col">
              <div className="mb-6">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block">{inst.role}</span>
                 <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-primary transition-colors">{inst.name}</h3>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">
                   {inst.bio}
                 </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {inst.topSkills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-wider text-gray-400 border border-gray-100 italic transition-all group-hover:bg-white group-hover:shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button className="flex-1 bg-gray-900 text-white rounded-2xl py-4 px-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <MessageSquare className="w-4 h-4" />
                    Message
                 </button>
                 <button className="flex-1 bg-white border border-gray-100 text-gray-900 rounded-2xl py-4 px-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-gray-50">
                    <Play className="w-4 h-4" />
                    Lessons
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Become an Instructor CTA */}
      <div className="bg-gray-900 rounded-[60px] p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-12 group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
         
         <div className="relative z-10 flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              Want to <span className="text-primary italic">shape futures</span>? 
              <br className="hidden md:block" /> Join our faculty today.
            </h2>
            <p className="text-gray-400 font-medium text-lg max-w-xl">
              Share your expertise with a global community of students and build your personal brand as an industry educator.
            </p>
            <button className="bg-white text-gray-900 py-5 px-10 rounded-[30px] font-black text-sm uppercase tracking-widest flex items-center gap-4 shadow-2xl hover:scale-105 transition-all group/btn">
              Apply to Teach
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
         </div>

         <div className="relative z-10 w-full md:w-auto grid grid-cols-2 gap-4">
            <div className="aspect-square w-32 md:w-48 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center group-hover:translate-y-2 transition-transform">
               <span className="text-3xl font-black text-primary">500+</span>
               <span className="text-[10px] font-bold text-gray-500 uppercase mt-2">Authors</span>
            </div>
            <div className="aspect-square w-32 md:w-48 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform">
               <span className="text-3xl font-black text-indigo-400">1.2M</span>
               <span className="text-[10px] font-bold text-gray-500 uppercase mt-2">Students</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Instructors;
