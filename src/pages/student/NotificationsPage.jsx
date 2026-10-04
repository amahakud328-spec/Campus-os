import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  Filter,
  Trash2
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    showToast
  } = useCampus();

  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Requests', 'Academic', 'Hostel', 'Mess', 'Fees', 'Important'];

  const filtered = notifications.filter((n) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Important') return n.type === 'warning' || n.priority === 'High';
    return n.category?.toLowerCase() === selectedFilter.toLowerCase();
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Notification Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time updates regarding service approvals, warden decisions, notices, and exam alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs self-start cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-indigo-600" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => markNotificationAsRead(item.id)}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-all hover:bg-slate-50/80 cursor-pointer ${
              item.unread ? 'bg-indigo-50/30' : ''
            }`}
          >
            <div className="pt-0.5 shrink-0">{getIcon(item.type)}</div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">{item.title}</h4>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" /> {item.time}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>

              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {item.category || 'General'}
                </span>
                {item.unread && (
                  <span className="text-[11px] text-indigo-600 font-semibold hover:underline">
                    Click to mark as read
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-800">No notifications</h4>
            <p className="text-xs text-slate-500 mt-1">You're all caught up with your campus services!</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationsPage;
