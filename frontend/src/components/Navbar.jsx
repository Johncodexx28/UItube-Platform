import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlaySquare, UserCircle, Search, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <PlaySquare className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">UITUBE</span>
            </Link>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="w-full max-w-lg relative">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search teachers or videos..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Hello, {user.name} ({user.role})
                </span>
                <button className="text-gray-500 hover:text-gray-700">
                  <UserCircle className="h-6 w-6" />
                </button>
                <button onClick={logout} className="text-gray-500 hover:text-red-600">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
