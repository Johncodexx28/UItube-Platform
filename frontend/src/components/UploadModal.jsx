import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../utils/api';

const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    courseId: '',
    visibility: 'Public',
    assignedSections: [],
  });
  const [sections] = useState(['Section A', 'Section B', 'Section C', 'Section D']);

  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      resetForm();
    }
  }, [isOpen]);

  const fetchCourses = async () => {
    try {
      const data = await api.get('/videos/courses');
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setCourses([]);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      courseId: '',
      visibility: 'Public',
      assignedSections: [],
    });
    setError('');
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) {
      setError('Title and Video URL are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await api.post('/videos', formData);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.data?.message || err.message || 'Failed to upload video');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between shrink-0">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Upload <span className="text-primary">Lesson</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto hide-scrollbar">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-90 duration-300">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Successful!</h3>
              <p className="text-gray-500">Your lesson is being processed and will be live shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Lesson Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Introduction to React Hooks"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Description</label>
                  <textarea
                    rows="3"
                    placeholder="What will students learn in this lesson?"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Video URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-sm"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Thumbnail URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 text-sm"
                      value={formData.thumbnailUrl}
                      onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Course Category</label>
                   <select
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer"
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  >
                    <option value="">Select a course (Optional)</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>{course.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-6 p-6 bg-gray-50 rounded-[24px] border border-gray-100">
                  <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Visibility</label>
                    <div className="flex gap-4">
                      {['Public', 'Private'].map((v) => (
                        <label key={v} className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all font-bold text-sm ${
                          formData.visibility === v 
                            ? 'bg-white border-primary text-primary shadow-sm' 
                            : 'bg-transparent border-transparent text-gray-400 hover:bg-white/50'
                        }`}>
                          <input 
                            type="radio" 
                            name="visibility" 
                            className="hidden" 
                            value={v} 
                            checked={formData.visibility === v}
                            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Target Sections</label>
                    <div className="flex flex-wrap gap-2">
                      {sections.map((s) => (
                        <label key={s} className={`px-4 py-2 rounded-lg border-2 cursor-pointer transition-all font-bold text-[10px] uppercase tracking-wider ${
                          formData.assignedSections.includes(s)
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-200'
                        }`}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={formData.assignedSections.includes(s)}
                            onChange={(e) => {
                              const updated = e.target.checked 
                                ? [...formData.assignedSections, s]
                                : formData.assignedSections.filter(x => x !== s);
                              setFormData({ ...formData, assignedSections: updated });
                            }}
                          />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gray-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Publish Lesson
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
