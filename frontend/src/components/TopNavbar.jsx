import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-slate-50/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white text-gray-800 rounded-3xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium placeholder:text-gray-400 border border-gray-100 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full shadow-sm border border-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=random`}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-100 transition-all shadow-sm"
            />
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {user?.name || "User"}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="py-2">
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
