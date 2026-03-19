import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart2,
  Folder,
  BookOpen,
  MessageSquare,
  Users,
  PieChart,
  Settings,
  Book,
  LogOut,
  LayoutDashboard,
  Video,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/uiLogo.png";

const studentNavItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Class", path: "/my-class", icon: Book },
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "Instructors", path: "/instructors", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

const teacherNavItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Class", path: "/my-class", icon: Users },
  { name: "My Lessons", path: "/my-lessons", icon: Video },
  { name: "Assignments", path: "/assignments", icon: ClipboardList },
  { name: "Analytics", path: "/reports", icon: PieChart },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const items = user?.role === "Teacher" ? teacherNavItems : studentNavItems;

  return (
    <div className="w-64 h-screen bg-white shadow-sm flex-col border-r border-gray-100 hidden md:flex sticky top-0">
      <div className="p-6 flex items-center space-x-3 mb-4">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <div className="flex items-center">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            UI
          </span>
          <span className="text-primary font-black text-2xl">tube</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 font-bold text-sm ${
                isActive
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-200 translate-x-1"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon
              className={`w-5 h-5 ${item.name === "Overview" && "animate-pulse"}`}
            />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User info + Logout */}
      <div className="px-4 pb-6 mt-auto border-t border-gray-100 pt-4">
        {user && (
          <div className="flex items-center space-x-3 px-4 py-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-red-500 hover:bg-red-50 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="cursor-pointer">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
