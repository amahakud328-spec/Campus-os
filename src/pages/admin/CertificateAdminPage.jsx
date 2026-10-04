import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Eye,
  Search,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const CertificateAdminPage = () => {
  const { requests, updateRequestStatus, showToast } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const certRequests = requests.filter((r) => r.requestType === 'Certificate Request');

  const pendingCount = certRequests.filter((c) => c.status === 'Pending').length;
  const processingCount = certRequests.filter((c) => c.status === 'Processing').length;
  const readyCount = certRequests.filter((c) => c.status === 'Approved' || c.status === 'Ready').length;

  const filtered = certRequests.filter(
    (c) =>
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificateType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Academic Certificate Verification & Issuance
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review student credentials, authenticate enrollments, and digitally issue signed certificates.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Verification</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{pendingCount}</h3>
          <span className="text-[11px] text-amber-700">Awaiting department check</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Under Processing</p>
          <h3 className="text-3xl font-black text-blue-600 mt-2">{processingCount}</h3>
          <span className="text-[11px] text-blue-700">Registrar seal signing</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ready / Issued</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{readyCount}</h3>
          <span className="text-[11px] text-emerald-700">Available for download</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, ID or certificate type..."
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filtered.length} certificate applications
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Request ID</th>
                <th className="pb-3">Student Details</th>
                <th className="pb-3">Certificate Type</th>
                <th className="pb-3">Purpose</th>
                <th className="pb-3">Required By</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-emerald-700">
                    #{cert.id}
                  </td>

                  <td className="py-3.5">
                    <span className="font-bold text-slate-900 block">{cert.studentName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{cert.studentId}</span>
                  </td>

                  <td className="py-3.5 font-bold text-slate-800">
                    {cert.certificateType}
                  </td>

                  <td className="py-3.5 text-slate-600 max-w-xs truncate" title={cert.purpose}>
                    {cert.purpose}
                  </td>

                  <td className="py-3.5 text-slate-600">{cert.requiredDate}</td>

                  <td className="py-3.5">
                    <StatusBadge status={cert.status} />
                  </td>

                  <td className="py-3.5 pr-2 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {cert.status !== 'Approved' && cert.status !== 'Ready' ? (
                        <>
                          <button
                            onClick={() =>
                              updateRequestStatus(
                                cert.id,
                                'Approved',
                                'Certificate digitally verified and generated.'
                              )
                            }
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                          >
                            Mark Ready
                          </button>
                          <button
                            onClick={() =>
                              updateRequestStatus(
                                cert.id,
                                'Processing',
                                'Enrollment verified. Forwarded to Registrar.'
                              )
                            }
                            className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs"
                          >
                            Process
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> E-Seal Ready
                        </span>
                      )}
                    </div>
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
export default CertificateAdminPage;
