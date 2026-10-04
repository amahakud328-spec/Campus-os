import React from 'react';
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  BookOpen,
  Info
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
import CircularProgress from '../../components/ui/CircularProgress';
import StatusBadge from '../../components/common/StatusBadge';
import { attendanceData } from '../../data/mockData';
import { attendanceWeeklyTrends } from '../../data/analyticsData';

export const AttendancePage = () => {
  const { overallPercentage, presentCount, absentCount, totalClasses, minRequired, subjects } =
    attendanceData;

  const warningSubjects = subjects.filter((s) => s.percentage < minRequired);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Attendance Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your class attendance, safe thresholds, and subject-wise lecture statistics.
        </p>
      </div>

      {/* Attendance Warning Banner if applicable */}
      {warningSubjects.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-xs">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm">
            <h4 className="font-bold text-amber-900 text-sm">Attendance Shortfall Warning</h4>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              Your attendance in{' '}
              <span className="font-bold">{warningSubjects.map((s) => s.name).join(', ')}</span> is currently{' '}
              <span className="font-bold">{warningSubjects[0].percentage}%</span>, which is below the mandatory{' '}
              {minRequired}% threshold. You must attend the next 2 consecutive lectures to restore eligibility for
              the upcoming Mid-Term examinations.
            </p>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Overall Percentage Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Rate</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{overallPercentage}%</h3>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Above 75% cutoff
            </span>
          </div>
          <CircularProgress percentage={overallPercentage} size={90} strokeWidth={8} subtitle="Current" />
        </div>

        {/* Present Count */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Classes Present</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{presentCount}</h3>
          <p className="text-xs text-slate-500 mt-2">Verified biometric & digital logs</p>
        </div>

        {/* Absent Count */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Classes Missed</p>
          <h3 className="text-3xl font-black text-rose-500 mt-2">{absentCount}</h3>
          <p className="text-xs text-slate-500 mt-2">Includes 3 medical leaves pending</p>
        </div>

        {/* Total Classes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Held Classes</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{totalClasses}</h3>
          <p className="text-xs text-slate-500 mt-2">Current Semester Week 7</p>
        </div>
      </div>

      {/* Recharts: Attendance Trend Over Time */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Attendance Trend (Weekly)</h3>
            <p className="text-xs text-slate-500">Weekly progression of attended classes vs target 75% line</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-indigo-600 font-semibold">
              <span className="w-3 h-3 rounded-full bg-indigo-600" /> Attendance %
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-3 h-1 bg-emerald-500" /> 75% Minimum Target
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={attendanceWeeklyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl">
                        <p className="font-bold">{label}</p>
                        <p className="text-cyan-300 mt-1">Attendance: {payload[0].value}%</p>
                        <p className="text-slate-400 text-[10px]">
                          Attended: {payload[0].payload.attended} / {payload[0].payload.total} classes
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#4f46e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#attendanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Subject-Wise Breakdown</h3>
            <p className="text-xs text-slate-500">Detailed lecture count and progress indicators by registered course</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Total Courses: {subjects.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Course Code & Name</th>
                <th className="pb-3 text-center">Total Held</th>
                <th className="pb-3 text-center">Present</th>
                <th className="pb-3 text-center">Absent</th>
                <th className="pb-3 w-48">Progress Indicator</th>
                <th className="pb-3 text-center">Percentage</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {subjects.map((sub) => {
                const isWarning = sub.percentage < minRequired;
                return (
                  <tr key={sub.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-medium">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                          {sub.code.substring(0, 2)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{sub.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{sub.code}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-center font-semibold text-slate-800">{sub.total}</td>
                    <td className="py-3.5 text-center font-semibold text-emerald-600">{sub.present}</td>
                    <td className="py-3.5 text-center font-semibold text-rose-500">{sub.absent}</td>

                    {/* Progress Bar */}
                    <td className="py-3.5">
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${sub.percentage}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 text-center font-bold text-slate-900">
                      {sub.percentage}%
                    </td>

                    <td className="py-3.5 pr-2 text-right">
                      <StatusBadge status={isWarning ? 'warning' : 'safe'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AttendancePage;
