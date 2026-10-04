import React, { useState } from 'react';
import {
  KeyRound,
  QrCode,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Shield,
  Plus,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Timeline from '../../components/ui/Timeline';
import Modal from '../../components/common/Modal';

export const GatePassPage = () => {
  const { studentProfile, requests, addRequest, showToast, triggerConfetti } = useCampus();

  const [destination, setDestination] = useState('');
  const [reason, setReason] = useState('');
  const [leavingDate, setLeavingDate] = useState('2026-09-21');
  const [leavingTime, setLeavingTime] = useState('05:00 PM');
  const [returnTime, setReturnTime] = useState('09:00 PM');
  const [emergencyContact, setEmergencyContact] = useState(studentProfile.emergencyContact);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePassForQR, setActivePassForQR] = useState(null);

  // Filter gate pass requests
  const gatePasses = requests.filter(
    (r) =>
      r.requestType === 'Gate Pass' &&
      (r.studentId === studentProfile.studentId || r.studentName === studentProfile.name)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim() || !reason.trim()) {
      showToast('Please fill in destination and reason', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const passId = `GP-${Math.floor(1000 + Math.random() * 9000)}`;
      addRequest({
        id: passId,
        requestType: 'Gate Pass',
        destination,
        reason,
        leavingDate,
        leavingTime,
        returnTime,
        emergencyContact,
        priority: 'Normal',
        status: 'Pending',
        assignedTo: 'Hostel Warden (Block C)',
        department: 'Hostel & Security',
        qrCodeString: `CAMPUSCONNECT-${passId}-PENDING`
      });

      setDestination('');
      setReason('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Digital Gate Pass
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Apply for campus exit passes, emergency hospital visits, and generate QR codes for gate guards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gate Pass Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Request New Gate Pass</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Destination / City Area
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. City Hospital, Central Mall, Home"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:outline-hidden font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Purpose / Reason
                </label>
                <textarea
                  rows={2}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="State specific purpose for leaving campus premises..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Date of Leaving
                </label>
                <input
                  type="date"
                  required
                  value={leavingDate}
                  onChange={(e) => setLeavingDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Leaving Time
                  </label>
                  <input
                    type="text"
                    required
                    value={leavingTime}
                    onChange={(e) => setLeavingTime(e.target.value)}
                    placeholder="05:00 PM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:outline-hidden font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Expected Return
                  </label>
                  <input
                    type="text"
                    required
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    placeholder="09:00 PM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:outline-hidden font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Emergency Parent Contact
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:outline-hidden font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="p-3 bg-cyan-50/60 rounded-xl text-cyan-800 text-[11px] leading-relaxed">
                <span className="font-bold block mb-0.5">⚠️ Campus Curfew Notice:</span>
                All hostel students must re-enter main campus gate before 09:30 PM unless extended night pass is granted.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Generating Gate Pass...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Request Gate Pass</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Gate Pass Status Cards */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <h3 className="font-bold text-base text-slate-900">Your Gate Passes & QR Badges</h3>
            <span className="text-xs text-slate-500 font-semibold">{gatePasses.length} total passes</span>
          </div>

          {gatePasses.map((pass) => {
            const isApproved = pass.status === 'Approved';
            const isPending = pass.status === 'Pending';
            const stepIndex = isApproved ? 2 : isPending ? 1 : 0;

            const trackingSteps = [
              { label: 'Requested', timestamp: pass.date },
              { label: 'Warden Review', timestamp: isApproved ? 'Verified' : 'In Review' },
              { label: 'Gate QR Ready', timestamp: isApproved ? 'Authorized' : 'Pending' }
            ];

            return (
              <div
                key={pass.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 shadow-xs hover:shadow-md ${
                  isApproved ? 'border-emerald-200' : 'border-slate-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isApproved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-slate-900">Pass #{pass.id}</h4>
                        <StatusBadge status={pass.status} />
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Destination: <span className="font-semibold text-slate-700">{pass.destination}</span></p>
                    </div>
                  </div>

                  {isApproved && (
                    <button
                      onClick={() => setActivePassForQR(pass)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-cyan-300" />
                      <span>Show Gate QR</span>
                    </button>
                  )}
                </div>

                {/* Timeline Stepper */}
                <div className="py-2">
                  <Timeline steps={trackingSteps} currentStepIndex={stepIndex} />
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Leaving Time</span>
                    <span className="font-bold text-slate-900">{pass.leavingTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Return Time</span>
                    <span className="font-bold text-slate-900">{pass.returnTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Approved By</span>
                    <span className="font-bold text-slate-900">{pass.assignedTo || 'Warden'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Emergency No</span>
                    <span className="font-bold text-slate-900 truncate block">{pass.emergencyContact}</span>
                  </div>
                </div>

                {pass.adminComment && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Warden Remark: </span>
                    {pass.adminComment}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Code Pass Modal */}
      <Modal
        isOpen={!!activePassForQR}
        onClose={() => setActivePassForQR(null)}
        title="Official Security Gate Pass"
      >
        {activePassForQR && (
          <div className="space-y-6 text-center text-xs">
            <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col items-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                {/* SVG QR Code Simulation */}
                <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  {/* Outer corner markers */}
                  <rect x="10" y="10" width="24" height="24" rx="4" stroke="#0f172a" strokeWidth="6" fill="white" />
                  <rect x="17" y="17" width="10" height="10" rx="2" fill="#0f172a" />
                  <rect x="66" y="10" width="24" height="24" rx="4" stroke="#0f172a" strokeWidth="6" fill="white" />
                  <rect x="73" y="17" width="10" height="10" rx="2" fill="#0f172a" />
                  <rect x="10" y="66" width="24" height="24" rx="4" stroke="#0f172a" strokeWidth="6" fill="white" />
                  <rect x="17" y="73" width="10" height="10" rx="2" fill="#0f172a" />
                  {/* Center & patterns */}
                  <circle cx="50" cy="50" r="8" fill="#4f46e5" />
                  <rect x="42" y="12" width="6" height="14" fill="#0f172a" />
                  <rect x="42" y="74" width="6" height="14" fill="#0f172a" />
                  <rect x="12" y="42" width="14" height="6" fill="#0f172a" />
                  <rect x="74" y="42" width="14" height="6" fill="#0f172a" />
                  <rect x="66" y="66" width="10" height="10" fill="#0f172a" />
                  <rect x="80" y="80" width="10" height="10" fill="#0f172a" />
                </svg>
              </div>

              <div className="mt-4">
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  ● Authorized Gate Pass
                </span>
                <h3 className="text-lg font-black mt-2">Pass #{activePassForQR.id}</h3>
                <p className="text-slate-400 text-xs">{studentProfile.name} • {studentProfile.studentId}</p>
                <p className="text-cyan-300 font-mono text-[11px] mt-1">Hostel: {studentProfile.room}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-left space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="font-bold text-slate-800">{activePassForQR.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Out-Time:</span>
                <span className="font-bold text-slate-800">{activePassForQR.leavingTime} ({activePassForQR.leavingDate})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Strict Return Curfew:</span>
                <span className="font-bold text-rose-600">{activePassForQR.returnTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Phone:</span>
                <span className="font-bold text-slate-800">{activePassForQR.emergencyContact}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save Pass
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default GatePassPage;
