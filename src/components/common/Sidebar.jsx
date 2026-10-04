import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  FileText,
  KeyRound,
  Award,
  Building2,
  UtensilsCrossed,
  BellRing,
  CreditCard,
  Bell,
  UserCheck,
  Settings,
  LogOut,
  Users,
  BarChart3,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  X
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const Sidebar = ({ role = 'student', isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requests, notices, notifications, setCurrentUserRole } = useCampus();

  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;
  const unreadNoticesCount = notices.length;
  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  const studentNavItems = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck, badge: '82%' },
    { to: '/student/timetable', label: 'Timetable', icon: CalendarDays },
    { to: '/student/leave', label: 'Leave Application', icon: FileText },
    { to: '/student/gatepass', label: 'Gate Pass', icon: KeyRound },
    { to: '/student/certificates', label: 'Certificate Request', icon: Award },
    { to: '/student/hostel', label: 'Hostel', icon: Building2 },
    { to: '/student/mess', label: 'Mess', icon: UtensilsCrossed },
    { to: '/student/notices', label: 'Notices', icon: BellRing, badge: unreadNoticesCount },
    { to: '/student/fees', label: 'Fees', icon: CreditCard },
    { to: '/student/notifications', label: 'Notifications', icon: Bell, badge: unreadNotifCount },
    { to: '/student/profile', label: 'Profile', icon: UserCheck }
  ];

  const adminNavItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/requests', label: 'Central Requests', icon: FileText, badge: pendingRequestsCount, badgeColor: 'bg-amber-500 text-white' },
    { to: '/admin/students', label: 'Students Roster', icon: Users },
    { to: '/admin/leave', label: 'Leave Requests', icon: CalendarCheck },
    { to: '/admin/gatepass', label: 'Gate Pass Requests', icon: KeyRound },
    { to: '/admin/certificates', label: 'Certificate Requests', icon: Award },
    { to: '/admin/hostel', label: 'Hostel Complaints', icon: Building2 },
    { to: '/admin/mess', label: 'Mess Complaints', icon: UtensilsCrossed },
    { to: '/admin/notices', label: 'Manage Notices', icon: BellRing },
    { to: '/admin/analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { to: '/admin/profile', label: 'Admin Profile', icon: ShieldCheck }
  ];

  const navItems = role === 'admin' ? adminNavItems : studentNavItems;

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSwitchPortal = () => {
    const target = role === 'student' ? 'admin' : 'student';
    setCurrentUserRole(target);
    navigate(target === 'student' ? '/student/dashboard' : '/admin/dashboard');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-64 select-none">
      {/* Brand Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
              Campus<span className="text-indigo-600">Connect</span>
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 mt-0.5 block">
              {role === 'admin' ? 'Admin Console' : 'Student Portal'}
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Main Menu</p>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-600 group-hover:text-indigo-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.badgeColor
                      ? item.badgeColor
                      : isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Switch Portal card */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <button
          onClick={handleSwitchPortal}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 hover:border-indigo-200 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              {role === 'student' ? <ShieldCheck className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">
                Switch to {role === 'student' ? 'Admin' : 'Student'}
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5">Toggle live roles</p>
            </div>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 group-hover:rotate-12 transition-transform" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-[33px] h-[calc(100vh-33px)] shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full shadow-2xl z-10 animate-slide-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
