import React, { useState } from 'react';
import {
  Award,
  FileCheck,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Timeline from '../../components/ui/Timeline';
import Modal from '../../components/common/Modal';

export const CertificatePage = () => {
  const { studentProfile, requests, addRequest, showToast, triggerConfetti } = useCampus();

  const [certType, setCertType] = useState('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');
  const [requiredDate, setRequiredDate] = useState('2026-09-28');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  // Filter certificate requests
  const certRequests = requests.filter(
    (r) =>
      r.requestType === 'Certificate Request' &&
      (r.studentId === studentProfile.studentId || r.studentName === studentProfile.name)
  );

  const certTypesList = [
    'Bonafide Certificate',
    'Character Certificate',
    'Course Completion Certificate',
    'Internship NOC Certificate',
    'Transfer Certificate (TC)',
    'Medium of Instruction Certificate',
    'Fee Estimation Certificate'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!purpose.trim()) {
      showToast('Please state the purpose of the certificate', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const certId = `CR-${Math.floor(700 + Math.random() * 200)}`;
      addRequest({
        id: certId,
        requestType: 'Certificate Request',
        certificateType: certType,
        purpose,
        requiredDate,
        additionalInfo: additionalInfo || 'Standard academic verification required.',
        priority: 'Normal',
        status: 'Processing',
        currentStep: 2, // 1: Submitted, 2: Processing, 3: Ready, 4: Downloaded
        assignedTo: 'Academic Registrar Office',
        department: 'Academics & Examination',
        adminComment: 'Application forwarded to Registrar for seal verification'
      });

      setPurpose('');
      setAdditionalInfo('');
      setIsSubmitting(false);
    }, 400);
  };

  const handleDownload = (cert) => {
    triggerConfetti();
    setPreviewCert(cert);
    showToast(`Generating ${cert.certificateType}...`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Certificate Request Desk
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Request official bonafide credentials, character certificates, and NOCs with digital stamp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Certificate Request Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Request a Certificate</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Certificate Type
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:outline-hidden font-medium text-slate-800"
                >
                  {certTypesList.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Purpose / Intended Use
                </label>
                <textarea
                  rows={3}
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Bank education loan application, Passport renewal, Summer internship NOC..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Required By Date
                </label>
                <input
                  type="date"
                  required
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Additional Information (Optional)
                </label>
                <input
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Addressee name, organization or embassy..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl text-emerald-800 text-[11px] leading-relaxed">
                <span className="font-bold block mb-0.5">ℹ️ Institutional Processing SLA:</span>
                Digital certificates are issued within 24 to 48 business hours with cryptographic QR verification.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Submit Certificate Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Tracking & Downloadable Cards */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <h3 className="font-bold text-base text-slate-900">Certificate Status & Downloads</h3>
            <span className="text-xs text-slate-500 font-semibold">{certRequests.length} requests</span>
          </div>

          {certRequests.map((cert) => {
            const isReady = cert.status === 'Approved' || cert.status === 'Ready' || cert.downloadable;
            const currentStep = isReady ? 3 : cert.status === 'Processing' ? 1 : 0;

            const trackingSteps = [
              { label: 'Submitted', timestamp: cert.date },
              { label: 'Processing', timestamp: isReady ? 'Verified' : 'Under Review' },
              { label: 'Ready for Download', timestamp: isReady ? 'Signed' : 'Pending' }
            ];

            return (
              <div
                key={cert.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 shadow-xs hover:shadow-md ${
                  isReady ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-slate-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isReady ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-slate-900">
                          {cert.certificateType || 'Bonafide Certificate'}
                        </h4>
                        <StatusBadge status={isReady ? 'Ready' : cert.status} />
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Tracking ID: #{cert.id} • Target Date: {cert.requiredDate}</p>
                    </div>
                  </div>

                  {isReady ? (
                    <button
                      onClick={() => handleDownload(cert)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Processing at Registrar</span>
                  )}
                </div>

                {/* 3-Step Timeline Stepper */}
                <div className="py-2">
                  <Timeline steps={trackingSteps} currentStepIndex={currentStep} />
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <p><span className="font-bold text-slate-700">Purpose: </span>{cert.purpose}</p>
                  {cert.adminComment && (
                    <p className="text-indigo-600 font-medium mt-1">
                      <span className="font-bold">Remarks: </span>{cert.adminComment}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Viewer / Print Modal */}
      <Modal
        isOpen={!!previewCert}
        onClose={() => setPreviewCert(null)}
        title="Official Verified E-Certificate"
        maxWidth="max-w-3xl"
      >
        {previewCert && (
          <div className="space-y-6">
            {/* Certificate Template Preview */}
            <div className="border-8 border-double border-indigo-900/40 p-8 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 text-center relative overflow-hidden shadow-inner">
              {/* Watermark seal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Award className="w-96 h-96 text-indigo-950" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-slate-900">
                    CampusConnect Institute of Technology
                  </h3>
                </div>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                  Office of Academic Registrar & Student Affairs
                </p>

                <div className="w-32 h-0.5 bg-indigo-900/30 mx-auto my-6" />

                <h4 className="text-2xl font-serif italic text-indigo-950 font-bold">
                  {previewCert.certificateType}
                </h4>

                <p className="mt-6 text-sm text-slate-700 leading-relaxed max-w-xl mx-auto font-serif">
                  This is to certify that <span className="font-bold text-slate-900 underline">{studentProfile.name}</span>,
                  bearing Student ID <span className="font-bold text-slate-900">{studentProfile.studentId}</span>, is a bonafide
                  regular student of <span className="font-bold text-slate-900">{studentProfile.department}</span> in the{' '}
                  <span className="font-bold text-slate-900">{studentProfile.year} ({studentProfile.semester})</span> for the
                  Academic Session 2026.
                </p>

                <p className="mt-4 text-xs text-slate-500 max-w-md mx-auto">
                  Issued for the purpose of: <span className="font-semibold text-slate-800">{previewCert.purpose}</span>.
                </p>

                {/* Signatures & Seal */}
                <div className="mt-10 pt-6 border-t border-slate-300/80 flex items-end justify-between px-8 text-xs">
                  <div className="text-left">
                    <span className="font-mono text-[10px] text-slate-400 block">Digital Verification Hash:</span>
                    <span className="font-mono text-[11px] text-slate-700 font-bold">CC-AUTH-{previewCert.id}-VERIFIED</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Date of Issue: 20 Sep 2026</span>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-indigo-900/50 flex items-center justify-center mx-auto mb-1 text-indigo-950 font-black text-[9px] uppercase tracking-tighter">
                      Official Seal
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">Registrar Stamp</span>
                  </div>

                  <div className="text-right">
                    <div className="font-serif italic text-base font-bold text-slate-800 mb-1">
                      Dr. Rajesh Sharma
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 block">Dean of Student Affairs</span>
                    <span className="text-[10px] text-slate-400">CampusConnect IT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setPreviewCert(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default CertificatePage;
