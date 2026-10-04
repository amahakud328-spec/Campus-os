import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import DemoBar from '../components/common/DemoBar';
import ToastContainer from '../components/common/Toast';

export const StudentLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hackathon Top Switcher Bar */}
      <DemoBar />

      <div className="flex flex-1 relative">
        {/* Student Sidebar */}
        <Sidebar
          role="student"
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            role="student"
            onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Global Toasts */}
      <ToastContainer />
    </div>
  );
};
export default StudentLayout;
