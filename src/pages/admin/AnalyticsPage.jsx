import React from 'react';
import {
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  requestsByCategory,
  departmentResolutionTime,
  frequentlyOccurringProblems
} from '../../data/analyticsData';

export const AnalyticsPage = () => {
  const pieColors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Campus Intelligence & Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Holistic metrics across department workloads, resolution times, request trends, and recurring bottlenecks.
        </p>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Resolution Time */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Average Resolution Speed
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <h3 className="text-4xl font-black text-slate-900">18.2 hrs</h3>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> -25% (Faster)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Down from 24.5 hrs average last month following automated digital department routing.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">This Month</span>
              <span className="font-bold text-slate-800">18.2 Hours</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Previous Month</span>
              <span className="font-bold text-slate-400">24.5 Hours</span>
            </div>
          </div>
        </div>

        {/* First Contact Resolution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              First-Contact Resolution Rate
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <h3 className="text-4xl font-black text-indigo-600">88.4%</h3>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                +6.2%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Requests approved or addressed without requiring follow-up inquiries or physical office visits.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Benchmark Target:</span>
            <span className="font-bold text-slate-800">85% Compliance</span>
          </div>
        </div>

        {/* Student Satisfaction Rating */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Campus Service CSAT Score
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <h3 className="text-4xl font-black text-amber-500">4.6 / 5.0</h3>
              <div className="text-amber-400 text-sm">★★★★★</div>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Calculated from 1,240 post-service reviews and meal feedback entries this semester.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Active Survey Responses:</span>
            <span className="font-bold text-slate-800">92% Response Rate</span>
          </div>
        </div>
      </div>

      {/* Two Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donut Chart: Requests by Category */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Requests by Category Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Share of total student applications across services</p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {requestsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl">
                          <p className="font-bold">{payload[0].name}</p>
                          <p className="text-cyan-300 mt-0.5">{payload[0].value} Requests</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-3 border-t border-slate-100">
            {requestsByCategory.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pieColors[idx] }} />
                <span className="text-slate-600 truncate">{cat.name}</span>
                <span className="font-bold text-slate-800 ml-auto">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Resolution Time by Department */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Department Resolution Time (Hours)</h3>
            <p className="text-xs text-slate-400 mt-0.5">Current month turnaround vs previous baseline</p>
          </div>

          <div className="h-72 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentResolutionTime}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="department" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl">
                          <p className="font-bold">{label}</p>
                          <p className="text-indigo-400 mt-1">Current: {payload[0].value} hrs</p>
                          <p className="text-slate-400">Previous: {payload[1].value} hrs</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="currentHours" name="Current Month" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="previousHours" name="Previous Month" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-100">
            IT & Network leads with fastest turnaround (6 hours avg).
          </p>
        </div>
      </div>

      {/* Frequently Occurring Problems Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Top 5 Frequently Occurring Campus Problems
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Identified friction areas based on student submission frequencies and turnaround latency
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl">
            Proactive Insights
          </span>
        </div>

        <div className="space-y-4">
          {frequentlyOccurringProblems.map((prob) => (
            <div
              key={prob.rank}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0">
                  #{prob.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{prob.issue}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {prob.category}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1 text-xs">
                    Root Action: <span className="font-medium text-slate-700">{prob.actionTaken}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Frequency</span>
                  <span className="font-bold text-slate-900">{prob.frequency}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Avg Latency</span>
                  <span className="font-bold text-indigo-600">{prob.avgResolution}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Priority</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                      prob.impact === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {prob.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AnalyticsPage;
