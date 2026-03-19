import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import OnboardingModal from './OnboardingModal';

const AppLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
      <OnboardingModal />
    </div>
  );
};

export default AppLayout;
