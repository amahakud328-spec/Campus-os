import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { studentRoster } from '../../data/analyticsData';
import StatusBadge from '../../components/common/StatusBadge';

export const StudentsDirectoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'CSE', 'ECE', 'Mechanical', 'Electrical', 'IT', 'Civil'];

  const filtered = studentRoster.filter((s) => {
    const matchesDept = selectedDept === 'All' || s.dept === selectedDept;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.hostel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Student Enrollment Roster
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete master registry of currently enrolled undergraduate and graduate students.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student by name, roll ID or hostel block..."
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 pl-4">Student ID</th>
                <th className="py-3.5">Full Name</th>
                <th className="py-3.5">Department & Year</th>
                <th className="py-3.5">Hostel & Room</th>
                <th className="py-3.5 text-center">Attendance %</th>
                <th className="py-3.5 text-center">CGPA</th>
                <th className="py-3.5 pr-4 text-right">Academic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-4 font-mono font-bold text-indigo-600">
                    {s.id}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3.5 text-slate-600">{s.dept} • {s.year}</td>
                  <td className="py-3.5 text-slate-600">{s.hostel}</td>
                  <td className="py-3.5 text-center font-bold">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        s.attendance < 75 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-bold text-slate-900">{s.cgpa}</td>
                  <td className="py-3.5 pr-4 text-right">
                    <StatusBadge status={s.status === 'Active' ? 'safe' : 'warning'} />
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
export default StudentsDirectoryPage;
