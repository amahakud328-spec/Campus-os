import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileText,
  KeyRound,
  Award,
  Building2,
  UtensilsCrossed,
  Sparkles,
  ArrowUpRight,
  Eye
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { useCampus } from '../../context/CampusContext';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { adminSummaryStats, requestsOverTime } from '../../data/analyticsData';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminProfile, requests, updateRequestStatus } = useCampus();

  const pendingRequests = requests.filter((r) => r.status === 'Pending');
  const openComplaints = requests.filter(
    (r) => (r.requestType.includes('Complaint') || r.requestType.includes('Hostel') || r.requestType.includes('Mess')) && r.status !== 'Resolved'
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-950/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Campus Unified Command Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Good Morning, Administrator 👋
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Here's your campus activity overview. You have{' '}
              <span className="font-bold text-amber-400">{pendingRequests.length} pending requests</span> requiring
              departmental action today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/requests')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Manage All Requests</span>
            </button>
            <button
              onClick={() => navigate('/admin/notices')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <span>Publish Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value="5,240"
          trend="+12% from last month"
          isPositive={true}
          icon={Users}
          color="indigo"
          onClick={() => navigate('/admin/students')}
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequests.length || 128}
          trend="-18% from last week"
          isPositive={true}
          icon={Hourglass}
          color="amber"
          onClick={() => navigate('/admin/requests?filter=pending')}
        />
        <StatCard
          title="Open Complaints"
          value={openComplaints.length || 42}
          trend="-8% resolution speed"
          isPositive={true}
          icon={AlertTriangle}
          color="rose"
          onClick={() => navigate('/admin/hostel')}
        />
        <StatCard
          title="Resolved Today"
          value="67"
          trend="+24% vs yesterday"
          isPositive={true}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Avg Resolution Time"
          value="18 hrs"
          trend="-25% turnaround"
          isPositive={true}
          icon={Clock}
          color="cyan"
          onClick={() => navigate('/admin/analytics')}
        />
      </div>

      {/* Activity Chart & Quick Decision Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recharts Area: Weekly Inflow by Service */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Weekly Request Volume</h3>
              <p className="text-xs text-slate-500">Service request distribution over the past 7 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-cyan-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Gate Passes
              </span>
              <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Leaves
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Certificates
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={requestsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gatePassGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="leaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl">
                          <p className="font-bold border-b border-slate-700 pb-1 mb-1">{label}</p>
                          {payload.map((entry, idx) => (
                            <p key={idx} style={{ color: entry.color }} className="mt-0.5">
                              {entry.name}: {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="gatePass" name="Gate Passes" stroke="#06b6d4" strokeWidth={2.5} fill="url(#gatePassGrad)" />
                <Area type="monotone" dataKey="leave" name="Leave Requests" stroke="#4f46e5" strokeWidth={2.5} fill="url(#leaveGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Priority Queue */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-base text-slate-900">Urgent Pending Actions</h3>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                {pendingRequests.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingRequests.slice(0, 4).map((req) => (
                <div
                  key={req.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{req.studentName}</span>
                    <StatusBadge status={req.priority} size="sm" />
                  </div>
                  <p className="text-slate-600 line-clamp-1">{req.requestType}: {req.reason || req.destination || req.description}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>{req.date}</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => updateRequestStatus(req.id, 'Approved', 'Approved via Admin Quick Actions')}
                        className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateRequestStatus(req.id, 'Rejected', 'Insufficient supporting documentation')}
                        className="px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => navigate('/admin/requests')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>Open Master Requests Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Central Requests Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Recent Campus Requests Stream</h3>
            <p className="text-xs text-slate-500">Live incoming applications from all student portals</p>
          </div>
          <button
            onClick={() => navigate('/admin/requests')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All ({requests.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Request ID</th>
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Service Type</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Assigned Department</th>
                <th className="pb-3 pr-2 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {requests.slice(0, 6).map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-indigo-600">
                    #{req.id}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">{req.studentName}</td>
                  <td className="py-3.5 text-slate-700">{req.requestType}</td>
                  <td className="py-3.5">
                    <StatusBadge status={req.priority} size="sm" />
                  </td>
                  <td className="py-3.5">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="py-3.5 text-slate-500">{req.department || req.assignedTo}</td>
                  <td className="py-3.5 pr-2 text-right">
                    {req.status === 'Pending' ? (
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => updateRequestStatus(req.id, 'Approved', 'Approved by Dean')}
                          className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateRequestStatus(req.id, 'Rejected', 'Declined by Dean')}
                          className="px-2.5 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
