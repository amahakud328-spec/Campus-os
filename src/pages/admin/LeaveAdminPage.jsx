import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Paperclip,
  Search,
  Filter,
  Users
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const LeaveAdminPage = () => {
  const { requests, updateRequestStatus, showToast } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);

  const leaveRequests = requests.filter((r) => r.requestType === 'Leave Application');

  const pendingCount = leaveRequests.filter((r) => r.status === 'Pending').length;
  const approvedCount = leaveRequests.filter((r) => r.status === 'Approved').length;
  const rejectedCount = leaveRequests.filter((r) => r.status === 'Rejected').length;

  const filteredLeaves = leaveRequests.filter(
    (l) =>
      l.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.reason && l.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Leave Approvals & Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review academic absence applications, evaluate doctor prescriptions, and grant leaves.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Review</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{pendingCount}</h3>
          <span className="text-[11px] text-amber-700 font-medium">Requires approval</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Approved Today</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{approvedCount}</h3>
          <span className="text-[11px] text-emerald-700 font-medium">Attendance adjusted</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rejected</p>
          <h3 className="text-3xl font-black text-rose-500 mt-2">{rejectedCount}</h3>
          <span className="text-[11px] text-slate-400">Unjustified absence</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leaves</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{leaveRequests.length}</h3>
          <span className="text-[11px] text-slate-400">Autumn Semester</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or reason..."
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredLeaves.length} applications
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Student</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">From</th>
                <th className="pb-3">To</th>
                <th className="pb-3">Reason</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2">
                    <span className="font-bold text-slate-900 block">{leave.studentName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{leave.studentId}</span>
                  </td>

                  <td className="py-3.5">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {leave.type || 'Leave'}
                    </span>
                  </td>

                  <td className="py-3.5 text-slate-700 font-medium">{leave.fromDate}</td>
                  <td className="py-3.5 text-slate-700 font-medium">{leave.toDate}</td>

                  <td className="py-3.5 text-slate-600 max-w-xs truncate" title={leave.reason}>
                    {leave.reason}
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={leave.status} />
                  </td>

                  <td className="py-3.5 pr-2 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedLeave(leave)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {leave.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateRequestStatus(leave.id, 'Approved', 'Leave approved by Dean Office')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition-colors text-xs cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateRequestStatus(leave.id, 'Rejected', 'Insufficient document verification')}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-colors text-xs cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Detail Modal */}
      <Modal
        isOpen={!!selectedLeave}
        onClose={() => setSelectedLeave(null)}
        title={`Leave Details: #${selectedLeave?.id}`}
      >
        {selectedLeave && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedLeave.studentName}</h4>
                <p className="text-slate-400 font-mono">{selectedLeave.studentId}</p>
              </div>
              <StatusBadge status={selectedLeave.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-slate-400 block font-semibold">Period:</span>
                <span className="font-bold text-slate-900">{selectedLeave.fromDate} → {selectedLeave.toDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Category:</span>
                <span className="font-bold text-indigo-700">{selectedLeave.type}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Student Explanation:</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                {selectedLeave.reason}
              </p>
            </div>

            {selectedLeave.attachment && (
              <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-indigo-900">
                <span className="flex items-center gap-2 font-medium">
                  <Paperclip className="w-4 h-4 text-indigo-600" />
                  {selectedLeave.attachment}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold text-indigo-600 border border-indigo-200">
                  Attached Proof
                </span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  updateRequestStatus(selectedLeave.id, 'Rejected', 'Reason not approved by Warden');
                  setSelectedLeave(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold"
              >
                Reject Leave
              </button>
              <button
                onClick={() => {
                  updateRequestStatus(selectedLeave.id, 'Approved', 'Approved by Academic Dean');
                  setSelectedLeave(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
              >
                Approve Leave
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default LeaveAdminPage;
