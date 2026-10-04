import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCampus } from '../../context/CampusContext';
import { GraduationCap, ShieldCheck, Home, LogIn, RotateCcw, Sparkles } from 'lucide-react';

export const DemoBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUserRole, setCurrentUserRole, resetDemoData } = useCampus();

  const isStudent = location.pathname.startsWith('/student');
  const isAdmin = location.pathname.startsWith('/admin');
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-3 sm:px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Hackathon banner indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wide uppercase text-[10px] text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/60">
            Hackathon Live Demo
          </span>
          <span className="hidden md:inline text-slate-400">
            Switch roles to test real-time student-admin synchronization
          </span>
        </div>

        {/* Right: Role & View switcher buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              setCurrentUserRole('student');
              navigate('/student/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
              isStudent
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Switch to Student Akash view"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student View</span>
          </button>

          <button
            onClick={() => {
              setCurrentUserRole('admin');
              navigate('/admin/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
              isAdmin
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Switch to Administrator Dr. Sharma view"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin View</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium transition-all ${
              isLanding
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Landing Page"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing</span>
          </button>

          <button
            onClick={() => navigate('/login')}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium transition-all ${
              isLogin
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Login Screen"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Login</span>
          </button>

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1 px-2 py-1 rounded-lg font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-500/20 transition-all ml-1"
            title="Reset Mock Data to initial state"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default DemoBar;
