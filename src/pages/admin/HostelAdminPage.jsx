import React, { useState } from 'react';
import {
  Building2,
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  UserCheck,
  Search,
  Eye,
  Filter,
  Sparkles,
  Paperclip
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Timeline from '../../components/ui/Timeline';
import Modal from '../../components/common/Modal';

export const HostelAdminPage = () => {
  const { requests, updateRequestStatus, showToast } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignStaffInput, setAssignStaffInput] = useState('');
  const [statusUpdateInput, setStatusUpdateInput] = useState('');

  const hostelComplaints = requests.filter((r) => r.requestType === 'Hostel Complaint');

  const openCount = hostelComplaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = hostelComplaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = hostelComplaints.filter((c) => c.status === 'Resolved').length;
  const highPriorityCount = hostelComplaints.filter((c) => c.priority === 'High').length;

  const filtered = hostelComplaints.filter(
    (c) =>
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModalSave = () => {
    if (!selectedComplaint) return;
    updateRequestStatus(
      selectedComplaint.id,
      statusUpdateInput || selectedComplaint.status,
      `Staff Assigned: ${assignStaffInput || selectedComplaint.assignedStaff || 'Technician'}`
    );
    setSelectedComplaint(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hostel Maintenance & Facility Tickets
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track hostel plumbing, Wi-Fi connectivity, electrical faults, and dispatch technical staff.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Open Tickets</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{openCount}</h3>
          <span className="text-[11px] text-amber-700">Awaiting technician assignment</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">In Progress</p>
          <h3 className="text-3xl font-black text-indigo-600 mt-2">{inProgressCount}</h3>
          <span className="text-[11px] text-indigo-700">On-site repair underway</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Resolved</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{resolvedCount}</h3>
          <span className="text-[11px] text-emerald-700">Completed this month</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">High Priority</p>
          <h3 className="text-3xl font-black text-rose-500 mt-2">{highPriorityCount}</h3>
          <span className="text-[11px] text-rose-600 font-bold">Urgent facility risk</span>
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
              placeholder="Search category, student or room..."
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filtered.length} complaints
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Ticket ID</th>
                <th className="pb-3">Student & Room</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Assigned Staff</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-amber-700">
                    #{comp.id}
                  </td>

                  <td className="py-3.5">
                    <span className="font-bold text-slate-900 block">{comp.studentName}</span>
                    <span className="text-[11px] text-slate-400">{comp.hostel} • {comp.room}</span>
                  </td>

                  <td className="py-3.5">
                    <span className="font-semibold text-slate-800">{comp.category}</span>
                  </td>

                  <td className="py-3.5 text-slate-600 max-w-xs truncate" title={comp.description}>
                    {comp.description}
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={comp.priority} size="sm" />
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={comp.status} />
                  </td>

                  <td className="py-3.5 text-slate-700 font-medium">
                    {comp.assignedStaff || 'Unassigned'}
                  </td>

                  <td className="py-3.5 pr-2 text-right">
                    <button
                      onClick={() => {
                        setSelectedComplaint(comp);
                        setAssignStaffInput(comp.assignedStaff || '');
                        setStatusUpdateInput(comp.status);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaint Detail & Status Timeline Modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={`Hostel Ticket Management: #${selectedComplaint?.id}`}
      >
        {selectedComplaint && (
          <div className="space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {selectedComplaint.category} Grievance
                </h4>
                <p className="text-slate-400">{selectedComplaint.hostel} • {selectedComplaint.room}</p>
              </div>
              <StatusBadge status={selectedComplaint.status} />
            </div>

            {/* Visual 4-Step Resolution Timeline */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Resolution Workflow Stage
              </span>
              <Timeline
                steps={[
                  { label: 'Reported', timestamp: selectedComplaint.date },
                  { label: 'Assigned', timestamp: 'Staff Notified' },
                  { label: 'In Progress', timestamp: 'On-site Inspection' },
                  { label: 'Resolved', timestamp: 'Ticket Closed' }
                ]}
                currentStepIndex={
                  selectedComplaint.status === 'Resolved'
                    ? 3
                    : selectedComplaint.status === 'In Progress'
                    ? 2
                    : 1
                }
              />
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Student Description:</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                {selectedComplaint.description}
              </p>
            </div>

            {/* Action form */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assign Maintenance Staff
                </label>
                <input
                  type="text"
                  value={assignStaffInput}
                  onChange={(e) => setAssignStaffInput(e.target.value)}
                  placeholder="e.g. Karan S. (Electrician) or Ramesh (Plumbing)"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Update Ticket Status
                </label>
                <select
                  value={statusUpdateInput}
                  onChange={(e) => setStatusUpdateInput(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="In Progress">In Progress (Staff Dispatched)</option>
                  <option value="Resolved">Resolved (Work Done)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleModalSave}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
              >
                Save Updates
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default HostelAdminPage;
