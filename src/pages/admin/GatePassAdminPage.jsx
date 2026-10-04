import React, { useState } from 'react';
import {
  KeyRound,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Shield,
  Search,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const GatePassAdminPage = () => {
  const { requests, updateRequestStatus, showToast } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPass, setSelectedPass] = useState(null);

  const gatePasses = requests.filter((r) => r.requestType === 'Gate Pass');

  const pendingCount = gatePasses.filter((p) => p.status === 'Pending').length;
  const approvedCount = gatePasses.filter((p) => p.status === 'Approved').length;

  const filtered = gatePasses.filter(
    (p) =>
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gate Pass Authorizations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Warden authorization console for student campus exits, night curfews, and emergency medical trips.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            {pendingCount} Pending Warden Sign-Off
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Pass Queue</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{pendingCount}</h3>
          <span className="text-[11px] text-amber-700">Awaiting security sign</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Approved Passes</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{approvedCount}</h3>
          <span className="text-[11px] text-emerald-700">QR codes generated</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Campus Curfew</p>
          <h3 className="text-2xl font-black text-slate-900 mt-2">09:30 PM</h3>
          <span className="text-[11px] text-slate-400">Strict gate closing</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Gate Security Desk</p>
          <h3 className="text-2xl font-black text-indigo-600 mt-2">Main Gate 1</h3>
          <span className="text-[11px] text-slate-400">Biometric scanner ready</span>
        </div>
      </div>

      {/* Passes Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, destination or pass ID..."
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filtered.length} gate requests
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Pass ID</th>
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Destination</th>
                <th className="pb-3">Out Time</th>
                <th className="pb-3">Return Curfew</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Warden Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((pass) => (
                <tr key={pass.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-cyan-700">
                    #{pass.id}
                  </td>

                  <td className="py-3.5">
                    <span className="font-bold text-slate-900 block">{pass.studentName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{pass.studentId}</span>
                  </td>

                  <td className="py-3.5">
                    <span className="font-medium text-slate-900 block">{pass.destination}</span>
                    <span className="text-[11px] text-slate-400 truncate block max-w-xs">{pass.reason}</span>
                  </td>

                  <td className="py-3.5 text-slate-700 font-medium">{pass.leavingTime}</td>

                  <td className="py-3.5 font-bold text-slate-900">{pass.returnTime}</td>

                  <td className="py-3.5">
                    <StatusBadge status={pass.priority} size="sm" />
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={pass.status} />
                  </td>

                  <td className="py-3.5 pr-2 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedPass(pass)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Pass"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {pass.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateRequestStatus(pass.id, 'Approved', 'Approved by Hostel Chief Warden')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition-colors text-xs cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateRequestStatus(pass.id, 'Rejected', 'Exceeds return curfew time limit')}
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

      {/* Pass Detail Modal */}
      <Modal
        isOpen={!!selectedPass}
        onClose={() => setSelectedPass(null)}
        title={`Pass Verification: #${selectedPass?.id}`}
      >
        {selectedPass && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedPass.studentName}</h4>
                <p className="text-slate-400 font-mono">{selectedPass.studentId}</p>
              </div>
              <StatusBadge status={selectedPass.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-slate-400 block font-semibold">Destination:</span>
                <span className="font-bold text-slate-900">{selectedPass.destination}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Scheduled Timings:</span>
                <span className="font-bold text-slate-900">{selectedPass.leavingTime} → {selectedPass.returnTime}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Outing Reason:</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                {selectedPass.reason}
              </p>
            </div>

            <div className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-100 text-cyan-900 flex justify-between items-center">
              <span>Emergency Contact Phone:</span>
              <span className="font-bold text-sm font-mono">{selectedPass.emergencyContact}</span>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  updateRequestStatus(selectedPass.id, 'Rejected', 'Denied by Chief Warden');
                  setSelectedPass(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold"
              >
                Reject Gate Pass
              </button>
              <button
                onClick={() => {
                  updateRequestStatus(selectedPass.id, 'Approved', 'Approved with standard gate curfew');
                  setSelectedPass(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
              >
                Authorize & Generate QR
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default GatePassAdminPage;
