import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Paperclip,
  Share2,
  Sparkles
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const RequestManagementPage = () => {
  const [searchParams] = useSearchParams();
  const { requests, updateRequestStatus } = useCampus();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get('filter') === 'pending' ? 'Pending' : 'All'
  );
  const [selectedType, setSelectedType] = useState('All');
  const [activeModalRequest, setActiveModalRequest] = useState(null);

  // Modal admin edits
  const [adminCommentInput, setAdminCommentInput] = useState('');
  const [assignedDept, setAssignedDept] = useState('');

  const handleOpenModal = (req) => {
    setActiveModalRequest(req);
    setAdminCommentInput(req.adminComment || '');
    setAssignedDept(req.department || 'Academics');
  };

  const statuses = ['All', 'Pending', 'Processing', 'Approved', 'Rejected', 'Resolved'];

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = selectedStatus === 'All' || req.status === selectedStatus;
    const matchesType = selectedType === 'All' || req.requestType === selectedType;
    const matchesQuery =
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.reason && req.reason.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesType && matchesQuery;
  });

  const handleAction = (status) => {
    if (!activeModalRequest) return;
    updateRequestStatus(activeModalRequest.id, status, adminCommentInput);
    setActiveModalRequest(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Central Request Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review, verify, assign departments, and approve/reject all student applications in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
            {filteredRequests.length} of {requests.length} Requests
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Student, ID, Reason, Room..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-100 font-medium"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Service Types</option>
              <option value="Leave Application">Leave Applications</option>
              <option value="Gate Pass">Gate Passes</option>
              <option value="Certificate Request">Certificate Requests</option>
              <option value="Hostel Complaint">Hostel Complaints</option>
              <option value="Mess Complaint">Mess Complaints</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Review</option>
              <option value="Processing">Processing</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Quick status tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statuses.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Master Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 pl-4">Request ID</th>
                <th className="py-3.5">Student Details</th>
                <th className="py-3.5">Service Type</th>
                <th className="py-3.5">Applied Date</th>
                <th className="py-3.5">Priority</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Assigned To</th>
                <th className="py-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-4 font-mono font-bold text-indigo-600">
                    #{req.id}
                  </td>

                  <td className="py-3.5">
                    <div>
                      <span className="font-bold text-slate-900 block">{req.studentName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{req.studentId}</span>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <span className="font-semibold text-slate-800">{req.requestType}</span>
                    <span className="text-[11px] text-slate-400 block max-w-xs truncate">
                      {req.reason || req.purpose || req.destination || req.description}
                    </span>
                  </td>

                  <td className="py-3.5 text-slate-600">{req.date}</td>

                  <td className="py-3.5">
                    <StatusBadge status={req.priority} size="sm" />
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={req.status} />
                  </td>

                  <td className="py-3.5 text-slate-600">
                    {req.department || req.assignedTo || 'General'}
                  </td>

                  <td className="py-3.5 pr-4 text-right">
                    <button
                      onClick={() => handleOpenModal(req)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs">
            No matching requests found for the selected filters.
          </div>
        )}
      </div>

      {/* View & Act Modal */}
      <Modal
        isOpen={!!activeModalRequest}
        onClose={() => setActiveModalRequest(null)}
        title={`Review Application: #${activeModalRequest?.id}`}
        maxWidth="max-w-3xl"
      >
        {activeModalRequest && (
          <div className="space-y-5 text-xs">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-base font-black text-slate-900 block">
                  {activeModalRequest.requestType}
                </span>
                <span className="text-slate-400 text-[11px] font-mono">
                  Submitted: {activeModalRequest.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={activeModalRequest.priority} size="sm" />
                <StatusBadge status={activeModalRequest.status} />
              </div>
            </div>

            {/* Student card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Student</span>
                <span className="font-bold text-slate-900">{activeModalRequest.studentName}</span>
                <span className="text-slate-500 font-mono block">{activeModalRequest.studentId}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Department / Hostel</span>
                <span className="font-semibold text-slate-800">{activeModalRequest.department || 'CSE'}</span>
                <span className="text-slate-500 block">Room C-304</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Emergency Contact</span>
                <span className="font-semibold text-slate-800">{activeModalRequest.emergencyContact || '+91 98765 11223'}</span>
              </div>
            </div>

            {/* Request Content details */}
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100">
              <span className="font-bold text-slate-700 block">Application Details & Submitted Text:</span>
              <p className="text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                {activeModalRequest.reason || activeModalRequest.purpose || activeModalRequest.description || activeModalRequest.destination}
              </p>

              {activeModalRequest.fromDate && (
                <div className="flex gap-4 text-[11px] text-slate-600 pt-1">
                  <span><strong>Duration:</strong> {activeModalRequest.fromDate} to {activeModalRequest.toDate} ({activeModalRequest.duration})</span>
                </div>
              )}

              {activeModalRequest.attachment && (
                <div className="flex items-center justify-between p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <span className="flex items-center gap-2 font-medium text-indigo-900">
                    <Paperclip className="w-4 h-4 text-indigo-600" />
                    {activeModalRequest.attachment}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold bg-white px-2 py-0.5 rounded border border-indigo-200">
                    Verified Attachment
                  </span>
                </div>
              )}
            </div>

            {/* Department Assignment & Admin Remarks Input */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Route / Assign Department
                  </label>
                  <select
                    value={assignedDept}
                    onChange={(e) => setAssignedDept(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Academic Registrar">Academic Registrar</option>
                    <option value="Hostel & Warden">Hostel & Warden Desk</option>
                    <option value="Estate Maintenance">Estate Maintenance (Plumber/Electrician)</option>
                    <option value="Mess Committee">Mess & Catering Committee</option>
                    <option value="Security Gate Office">Security Gate Office</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Forward Note / Staff Assignee
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dispatched to Warden Dr. Mukherjee"
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Administrator Remarks / Reason for Approval or Rejection
                </label>
                <textarea
                  rows={2}
                  value={adminCommentInput}
                  onChange={(e) => setAdminCommentInput(e.target.value)}
                  placeholder="These comments will be visible to the student upon decision..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Decision Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModalRequest(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Cancel
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAction('Forwarded')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction('Resolved')}
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction('Rejected')}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction('Approved')}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Request</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default RequestManagementPage;
