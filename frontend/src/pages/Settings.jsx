import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut, 
  Camera, 
  Check, 
  ChevronRight,
  Mail,
  Smartphone,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'account', label: 'Account', icon: <Lock className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Tabs */}
        <div className="md:w-72 shrink-0 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Settings</h1>
            <p className="text-gray-400 font-medium text-sm">Manage your account and preferences</p>
          </div>

          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 p-4 rounded-3xl transition-all font-black text-sm uppercase tracking-widest ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white shadow-2xl shadow-gray-200' 
                    : 'text-gray-400 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-100 hover:shadow-sm'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-gray-100">
             <button 
               onClick={logout}
               className="w-full flex items-center gap-4 p-4 rounded-3xl text-red-500 hover:bg-red-50 transition-all font-black text-sm uppercase tracking-widest border border-transparent hover:border-red-100"
             >
               <LogOut className="w-5 h-5" />
               Log Out
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-[48px] p-10 border border-gray-50 shadow-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

            {activeTab === 'profile' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-gray-50">
                  <div className="relative group">
                     <div className="w-32 h-32 rounded-[40px] bg-gray-100 overflow-hidden ring-4 ring-white shadow-xl">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1ab788&color=fff&size=200`} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                     </div>
                     <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                        <Camera className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="text-center md:text-left">
                     <h3 className="text-2xl font-black text-gray-900 mb-1">{user?.name}</h3>
                     <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">{user?.role} • Student ID: #12849</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        defaultValue={user?.name}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="email" 
                        defaultValue={user?.email}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Timezone</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                        <option>Pacific Standard Time (PST)</option>
                        <option>Eastern Standard Time (EST)</option>
                        <option>Central European Time (CET)</option>
                        <option>Philippine Standard Time (PST)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-50">
                   <button 
                     onClick={handleSave}
                     disabled={isSaving}
                     className="bg-primary text-white py-4 px-10 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                   >
                     {isSaving ? 'Saving...' : showSuccess ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
                   </button>
                </div>
              </div>
            )}

            {activeTab !== 'profile' && (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <Shield className="w-10 h-10" />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">Section Under Construction</h3>
                 <p className="text-gray-400 max-w-xs mx-auto font-medium">We're working hard to bring you more control over your experience. Stay tuned!</p>
              </div>
            )}
          </div>

          {/* Quick Stats/Insight Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm flex items-center justify-between group">
                <div>
                   <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Current Plan</p>
                   <h4 className="text-xl font-black text-gray-900">Student Pro</h4>
                </div>
                <CreditCard className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
             </div>
             <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-2xl shadow-indigo-100 flex items-center justify-between group cursor-pointer hover:shadow-indigo-300 transition-all">
                <div>
                   <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-1">Auto-Renewal</p>
                   <h4 className="text-xl font-black">Active • Oct 2026</h4>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
