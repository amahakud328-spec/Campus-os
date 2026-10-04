import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  BookOpen,
  Clock,
  BellRing,
  ArrowRight,
  FileText,
  KeyRound,
  Award,
  Building2,
  UtensilsCrossed,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MapPin,
  User,
  Calendar,
  Layers
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import CircularProgress from '../../components/ui/CircularProgress';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { studentProfile, requests, notices, attendanceData } = useCampus();

  const [selectedRequest, setSelectedRequest] = useState(null);

  // Student specific requests
  const myRequests = requests.filter(
    (r) => r.studentId === studentProfile.studentId || r.studentName === studentProfile.name
  );

  const pendingCount = myRequests.filter((r) => r.status === 'Pending').length;

  const quickActions = [
    {
      title: "Apply Leave",
      desc: "Medical, personal or emergency",
      icon: FileText,
      to: "/student/leave",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:border-indigo-300"
    },
    {
      title: "Request Gate Pass",
      desc: "Digital QR pass for outings",
      icon: KeyRound,
      to: "/student/gatepass",
      color: "bg-cyan-50 text-cyan-600 border-cyan-100 hover:border-cyan-300"
    },
    {
      title: "Request Certificate",
      desc: "Bonafide, NOC, Character certs",
      icon: Award,
      to: "/student/certificates",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-300"
    },
    {
      title: "Report Hostel Issue",
      desc: "Wi-Fi, plumbing, electrical repairs",
      icon: Building2,
      to: "/student/hostel",
      color: "bg-amber-50 text-amber-600 border-amber-100 hover:border-amber-300"
    },
    {
      title: "Report Mess Issue",
      desc: "Meal feedback & hygiene concerns",
      icon: UtensilsCrossed,
      to: "/student/mess",
      color: "bg-rose-50 text-rose-600 border-rose-100 hover:border-rose-300"
    },
    {
      title: "View Notices",
      desc: "Exam, event & academic circulars",
      icon: BellRing,
      to: "/student/notices",
      color: "bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-300"
    }
  ];

  const todayClasses = [
    {
      time: "09:00 AM - 10:00 AM",
      subject: "Database Management Systems",
      code: "CS301",
      room: "Room 204",
      teacher: "Dr. Sunita Rao",
      type: "Lecture",
      status: "Upcoming",
      tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      time: "10:00 AM - 11:00 AM",
      subject: "Digital Logic Design",
      code: "CS302",
      room: "Room 301",
      teacher: "Prof. K. Verma",
      type: "Lecture",
      status: "Upcoming",
      tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200"
    },
    {
      time: "11:30 AM - 12:30 PM",
      subject: "Python Programming Lab",
      code: "CS303L",
      room: "Software Lab 2",
      teacher: "Dr. Ananya Sen",
      type: "Practical",
      status: "Upcoming",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      time: "02:00 PM - 03:00 PM",
      subject: "Computer Networks",
      code: "CS304",
      room: "Room 204",
      teacher: "Prof. Amit Patel",
      type: "Lecture",
      status: "Upcoming",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn Semester 2026 • Live Session</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Good Morning, Akash 👋
          </h2>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl">
            Here's what's happening on your campus today. You have 4 scheduled lectures and 1 active gate pass.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => navigate('/student/gatepass')}
            className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-indigo-600" />
            <span>Fast Gate Pass</span>
          </button>
          <button
            onClick={() => navigate('/student/leave')}
            className="px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm border border-indigo-400/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-300" />
            <span>Apply Leave</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Attendance Card with Circular Gauge */}
        <div
          onClick={() => navigate('/student/attendance')}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Attendance</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">76 of 88 attended</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 mt-3 group-hover:text-indigo-600 font-medium">
              View Breakdown →
            </span>
          </div>
          <CircularProgress percentage={82} size={88} strokeWidth={8} subtitle="Overall" />
        </div>

        {/* Today's Classes Card */}
        <div
          onClick={() => navigate('/student/timetable')}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Classes</p>
              <h4 className="text-3xl font-black text-slate-900 mt-2">4</h4>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-600" /> Next: 09:00 AM in Room 204
          </p>
        </div>

        {/* Pending Requests Card */}
        <div
          onClick={() => navigate('/student/leave')}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Requests</p>
              <h4 className="text-3xl font-black text-amber-600 mt-2">{pendingCount}</h4>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-amber-700 font-medium mt-3">
            1 Medical Leave awaiting review
          </p>
        </div>

        {/* Unread Notices Card */}
        <div
          onClick={() => navigate('/student/notices')}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Unread Notices</p>
              <h4 className="text-3xl font-black text-indigo-600 mt-2">{notices.length}</h4>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-105 transition-transform">
              <BellRing className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Mid-Term schedule & Hackathon live
          </p>
        </div>
      </div>

      {/* Today's Timetable Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Today's Schedule & Lectures</h3>
            <p className="text-xs text-slate-500 mt-0.5">Wednesday, 20 September 2026 • 3rd Year CSE</p>
          </div>
          <button
            onClick={() => navigate('/student/timetable')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Week Timetable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayClasses.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-500" />
                  {item.time}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.tagColor}`}>
                  {item.type}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mt-2.5 leading-snug">{item.subject}</h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{item.code}</p>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1 truncate font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {item.teacher}
                </span>
                <span className="flex items-center gap-1 font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  <MapPin className="w-3 h-3" />
                  {item.room}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Quick Actions</h3>
            <p className="text-xs text-slate-500">Direct shortcuts for your most frequent campus requests</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(action.to)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between group cursor-pointer ${action.color}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {action.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 leading-snug">
                    {action.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* My Requests Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">My Requests</h3>
            <p className="text-xs text-slate-500">Track and monitor status of your service requests</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Showing latest {myRequests.length} applications</span>
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Request ID & Type</th>
                <th className="pb-3">Submitted</th>
                <th className="pb-3">Details</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Last Updated</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {myRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-medium">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
                        {req.id.substring(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{req.requestType}</span>
                        <span className="text-[11px] text-slate-400 font-mono">#{req.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 text-slate-600">{req.date}</td>

                  <td className="py-3.5 text-slate-600 max-w-xs truncate">
                    {req.reason || req.purpose || req.description || req.destination || 'Service request'}
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={req.status} />
                  </td>

                  <td className="py-3.5 text-slate-500 text-[11px]">{req.lastUpdated}</td>

                  <td className="py-3.5 pr-2 text-right">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Request Details Modal */}
      <Modal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title={`Request Details: #${selectedRequest?.id}`}
      >
        {selectedRequest && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedRequest.requestType}</h4>
                <p className="text-xs text-slate-500 font-mono">Tracking ID: #{selectedRequest.id}</p>
              </div>
              <StatusBadge status={selectedRequest.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 font-semibold block">Student</span>
                <span className="text-slate-900 font-bold mt-0.5 block">{selectedRequest.studentName}</span>
                <span className="text-slate-500 font-mono">{selectedRequest.studentId}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 font-semibold block">Assigned Section</span>
                <span className="text-slate-900 font-bold mt-0.5 block">{selectedRequest.assignedTo || 'Administration'}</span>
                <span className="text-slate-500">{selectedRequest.department || 'General'}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-700 block">Application Summary / Reason:</span>
                <p className="mt-1 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedRequest.reason || selectedRequest.purpose || selectedRequest.description || 'N/A'}
                </p>
              </div>

              {selectedRequest.destination && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block font-medium">Destination:</span>
                    <span className="text-slate-900 font-bold">{selectedRequest.destination}</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block font-medium">Expected Return:</span>
                    <span className="text-slate-900 font-bold">{selectedRequest.returnTime}</span>
                  </div>
                </div>
              )}

              {selectedRequest.adminComment && (
                <div>
                  <span className="font-bold text-indigo-700 block">Administration Remarks:</span>
                  <p className="mt-1 text-indigo-900 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                    {selectedRequest.adminComment}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default StudentDashboard;
