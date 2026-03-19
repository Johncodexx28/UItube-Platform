import React from 'react';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderDevelopment = ({ title }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <Construction className="w-12 h-12 text-amber-600" />
      </div>
      
      <h1 className="text-4xl font-black text-gray-900 mb-4">
        {title || 'Coming Soon'} 🚧
      </h1>
      
      <p className="text-xl text-gray-500 max-w-md mx-auto mb-8">
        We're working hard to bring you the best experience! This page is currently under development. ✨
      </p>
      
      <Link 
        to="/dashboard" 
        className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default UnderDevelopment;
