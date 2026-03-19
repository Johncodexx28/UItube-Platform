import React, { useState } from 'react';
import { Search, Filter, Star, Clock, BookOpen, ChevronRight, PlayCircle } from 'lucide-react';

const mockCourses = [
  { id: 1, title: 'Introduction to Psychology', category: 'Social Sciences', instructor: 'Dr. Sarah Jenkins', rating: 4.8, students: '12k', hours: '24h', lessons: 32, image: 'bg-purple-100', imgPlaceholder: 'text-purple-500' },
  { id: 2, title: 'Creative Writing Masterclass', category: 'Arts & Humanities', instructor: 'Neil Gaiman', rating: 4.9, students: '45k', hours: '18h', lessons: 24, image: 'bg-blue-100', imgPlaceholder: 'text-blue-500' },
  { id: 3, title: 'Fundamentals of Marketing', category: 'Business', instructor: 'Philip Kotler', rating: 4.7, students: '8k', hours: '30h', lessons: 40, image: 'bg-green-100', imgPlaceholder: 'text-green-500' },
  { id: 4, title: 'Data Science for Beginners', category: 'Technology', instructor: 'Jose Portilla', rating: 4.6, students: '110k', hours: '45h', lessons: 60, image: 'bg-orange-100', imgPlaceholder: 'text-orange-500' },
  { id: 5, title: 'World History: Ancient Civilizations', category: 'History', instructor: 'Prof. Mary Beard', rating: 4.9, students: '15k', hours: '35h', lessons: 48, image: 'bg-yellow-100', imgPlaceholder: 'text-yellow-500' },
  { id: 6, title: 'Public Speaking & Communication', category: 'Personal Development', instructor: 'Chris Anderson', rating: 4.8, students: '32k', hours: '12h', lessons: 15, image: 'bg-pink-100', imgPlaceholder: 'text-pink-500' },
  { id: 7, title: 'Financial Literacy 101', category: 'Business', instructor: 'Suze Orman', rating: 4.7, students: '50k', hours: '16h', lessons: 20, image: 'bg-emerald-100', imgPlaceholder: 'text-emerald-500' },
  { id: 8, title: 'Spanish for Beginners', category: 'Languages', instructor: 'Maria Fernandez', rating: 4.8, students: '22k', hours: '40h', lessons: 50, image: 'bg-cyan-100', imgPlaceholder: 'text-cyan-500' },
];

const categories = ['All', 'Social Sciences', 'Arts & Humanities', 'Business', 'Technology', 'History', 'Personal Development', 'Languages'];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
          <p className="text-gray-500">Discover interdisciplinary subjects outside your major.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search subjects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group flex flex-col cursor-pointer">
              <div className={`h-40 ${course.image} relative flex items-center justify-center p-6 mb-2`}>
                <BookOpen className={`w-12 h-12 ${course.imgPlaceholder} opacity-80`} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  {course.rating}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase mb-2">{course.category}</span>
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>
                
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {course.hours}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4 text-gray-400" />
                    {course.lessons} Lessons
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 drop-shadow-sm">{course.students} students</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
