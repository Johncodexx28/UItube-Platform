import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  ChevronRight, 
  Plus, 
  MoreHorizontal, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const MyClass = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState(['Section A', 'Section B', 'Section C', 'Section D']);
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [lessons, setLessons] = useState([]);
  const [assignedLessons, setAssignedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);

  // Form state
  const [assignmentData, setAssignmentData] = useState({
    lessonId: '',
    section: 'Section A'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [lessonsData, myVideos] = await Promise.all([
        api.get('/videos/courses'), // For categories/courses if needed
        api.get('/videos/my-videos')
      ]);
      setLessons(myVideos);
      
      // Filter assigned lessons based on selected section (logic simplified for demo)
      const assigned = myVideos.filter(v => v.visibility === 'Private' && v.assignedSections?.includes(selectedSection));
      setAssignedLessons(assigned);
    } catch (error) {
      console.error('Error fetching class data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSection]);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignmentData.lessonId) return;

    try {
      setIsAssigning(true);
      // We'll update the video visibility to Private and add the section
      const video = lessons.find(v => v._id === assignmentData.lessonId);
      const updatedSections = [...(video.assignedSections || []), selectedSection];
      
      await api.post(`/videos`, {
        ...video,
        visibility: 'Private',
        assignedSections: updatedSections
      });

      fetchData();
      setAssignmentData({ ...assignmentData, lessonId: '' });
    } catch (error) {
      console.error('Error assigning lesson:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            My <span className="text-primary">Classes</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium bg-gray-50 inline-block px-4 py-1 rounded-full border border-gray-100">
            Managing assignments for {sections.length} active sections
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 pl-4">
             <Filter className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-black uppercase text-gray-400">Class</span>
          </div>
          <select 
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-gray-50 border-none rounded-2xl py-2 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {sections.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Assignment Tool */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-[40px] p-8 text-white shadow-2xl sticky top-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Plus className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Assign Lesson</h3>
            </div>

            <form onSubmit={handleAssign} className="space-y-6 relative z-10">
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-indigo-300 ml-1">Select Lesson</label>
                 <select 
                    required
                    value={assignmentData.lessonId}
                    onChange={(e) => setAssignmentData({ ...assignmentData, lessonId: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 font-bold text-white outline-none focus:bg-white/20 transition-all appearance-none cursor-pointer"
                 >
                    <option value="" className="text-gray-900">Choose a lesson...</option>
                    {lessons.map(l => (
                      <option key={l._id} value={l._id} className="text-gray-900">{l.title}</option>
                    ))}
                 </select>
               </div>

               <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center gap-3">
                     <ShieldAlert className="w-5 h-5 text-indigo-400" />
                     <p className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Privacy Notice</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Assigning a lesson to <span className="text-white font-bold">{selectedSection}</span> will make it <span className="text-indigo-400 font-bold italic">private</span>. Only students in this section will see it on their dashboard.
                  </p>
               </div>

               <button 
                  disabled={isAssigning || !assignmentData.lessonId}
                  className="w-full bg-white text-gray-900 py-5 rounded-[24px] font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Assignment
               </button>
            </form>
          </div>
        </div>

        {/* Assigned Lessons List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Live in <span className="text-indigo-600 italic underline underline-offset-8">{selectedSection}</span></h2>
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase">{assignedLessons.length} Assignments</span>
           </div>

           {assignedLessons.length === 0 ? (
             <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm border-dashed">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                   <Clock className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ongoing Prep</h3>
                <p className="text-gray-400 max-w-xs mx-auto font-medium">No private lessons have been assigned to this section yet.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {assignedLessons.map(video => (
                 <div key={video._id} className="group bg-white rounded-[40px] p-2 border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                    <div className="h-44 rounded-[32px] overflow-hidden relative">
                       {video.thumbnailUrl ? (
                         <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       ) : (
                         <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                           <BookOpen className="w-12 h-12" />
                         </div>
                       )}
                       <div className="absolute top-4 left-4">
                          <span className="bg-gray-900/80 backdrop-blur-md text-white border border-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                            Active assignment
                          </span>
                       </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                       <h4 className="font-black text-gray-900 text-lg mb-2 leading-tight group-hover:text-primary transition-colors">
                         {video.title}
                       </h4>
                       <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase">
                             <Users className="w-3.5 h-3.5" />
                             <span>{selectedSection}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase">
                             <CheckCircle2 className="w-3.5 h-3.5" />
                             <span>Visible</span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
           )}

           {/* Quick Tips */}
           <div className="bg-indigo-600 rounded-[40px] p-8 text-white mt-12 overflow-hidden relative shadow-2xl shadow-indigo-200">
               <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
               <div className="flex items-start gap-6 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                     <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-xl font-black mb-2 tracking-tight">Pro Tip: Peer Learning</h4>
                     <p className="text-indigo-100 font-medium text-sm leading-relaxed max-w-xl">
                        When you assign a lesson privately, try adding a discussion topic in the messages tab. Shared lessons within a section increase student interaction by 40%.
                     </p>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MyClass;
