import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Star,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { useCampus } from '../../context/CampusContext';
import { messAnalytics } from '../../data/analyticsData';
import StatusBadge from '../../components/common/StatusBadge';

export const MessAdminPage = () => {
  const { requests, updateRequestStatus, messRatings } = useCampus();

  const messComplaints = requests.filter((r) => r.requestType === 'Mess Complaint');

  const openComplaintsCount = messComplaints.filter((c) => c.status !== 'Resolved').length;
  const resolvedCount = messComplaints.filter((c) => c.status === 'Resolved').length;

  const barColors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Mess Administration & Food Quality Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor student meal ratings, catering hygiene compliance, and resolve dining complaints.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Grievances</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{messComplaints.length || messAnalytics.totalComplaints}</h3>
          <span className="text-[11px] text-slate-400">Across 4 daily meals</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Student Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-3xl font-black text-amber-500">4.2</h3>
            <div className="flex text-amber-400 text-sm">★★★★★</div>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">+0.3 improvement this month</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Open Issues</p>
          <h3 className="text-3xl font-black text-rose-500 mt-2">{openComplaintsCount || messAnalytics.openIssues}</h3>
          <span className="text-[11px] text-rose-600 font-semibold">Under investigation</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Resolved Complaints</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{resolvedCount || messAnalytics.resolvedIssues}</h3>
          <span className="text-[11px] text-emerald-700 font-semibold">Catering notices served</span>
        </div>
      </div>

      {/* Two Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Complaint Categories Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 mb-1">Grievances by Category</h3>
          <p className="text-xs text-slate-400 mb-6">Food quality and temperature dominate reports</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={messAnalytics.categories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl">
                          <p className="font-bold">{label}</p>
                          <p className="text-cyan-300 mt-0.5">Complaints: {payload[0].value}</p>
                          <p className="text-slate-400 text-[10px]">{payload[0].payload.percentage}% of total</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {messAnalytics.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Mess Rating Trend Over Time */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 mb-1">Weekly Rating Progression</h3>
          <p className="text-xs text-slate-400 mb-6">Weekly feedback trends across breakfast, lunch, and dinner</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={messAnalytics.weeklyRatings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[3, 5]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl">
                          <p className="font-bold">{label}</p>
                          <p className="text-amber-400 mt-0.5">Overall Rating: {payload[0].value} ★</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="rating" name="Overall" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="breakfast" name="Breakfast" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="3 3" />
                <Line type="monotone" dataKey="lunch" name="Lunch" stroke="#4f46e5" strokeWidth={1.5} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Complaints Table & Resolution */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <h3 className="font-bold text-base text-slate-900">Student Mess Complaints & Audit</h3>
          <span className="text-xs text-slate-500 font-semibold">{messComplaints.length} tickets recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Ticket ID</th>
                <th className="pb-3">Student</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Meal</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {messComplaints.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-rose-600">
                    #{comp.id}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">{comp.studentName}</td>
                  <td className="py-3.5 font-medium text-slate-700">{comp.category}</td>
                  <td className="py-3.5 text-slate-500">{comp.meal || 'General'}</td>
                  <td className="py-3.5 text-slate-600 max-w-xs truncate" title={comp.description}>
                    {comp.description}
                  </td>
                  <td className="py-3.5">
                    <StatusBadge status={comp.status} />
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    {comp.status !== 'Resolved' ? (
                      <button
                        onClick={() =>
                          updateRequestStatus(
                            comp.id,
                            'Resolved',
                            'Catering inspection completed & quality warning issued.'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">Resolved</span>
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
export default MessAdminPage;
