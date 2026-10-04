import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  Building2,
  Clock,
  KeyRound,
  Edit,
  Lock,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import Modal from '../../components/common/Modal';

export const AdminProfilePage = () => {
  const { adminProfile, setAdminProfile, showToast } = useCampus();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [phone, setPhone] = useState(adminProfile.phone);
  const [officeHours, setOfficeHours] = useState(adminProfile.officeHours);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAdminProfile((prev) => ({
      ...prev,
      phone,
      officeHours
    }));
    setIsEditOpen(false);
    showToast('Administrator contact details updated successfully!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Administrator Profile & Credentials
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Authorized administrative credentials, department designations, and office clearance logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left ID Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs text-center flex flex-col items-center">
            <div className="relative">
              <img
                src={adminProfile.avatar}
                alt={adminProfile.name}
                className="w-28 h-28 rounded-3xl object-cover ring-4 ring-indigo-100 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-indigo-600 border-2 border-white rounded-full flex items-center justify-center text-white">
                <ShieldCheck className="w-3 h-3" />
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mt-4">{adminProfile.name}</h3>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mt-1">
              {adminProfile.adminId}
            </span>

            <p className="text-xs text-slate-600 font-bold mt-2">{adminProfile.role}</p>
            <p className="text-[11px] text-slate-400">{adminProfile.department}</p>

            <div className="w-full mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs text-left">
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Authorization Level</span>
                <span className="font-bold text-indigo-700 uppercase tracking-wider text-[11px]">Level 5 SuperAdmin</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                <span className="text-slate-500 font-medium">Digital Signing Key</span>
                <span className="font-mono text-emerald-600 font-bold text-[11px]">Active (RSA-4096)</span>
              </div>
            </div>

            <div className="w-full mt-6 space-y-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Official Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Details Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Official Institutional Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Designated Office</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{adminProfile.office}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Public Consultation Hours</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{adminProfile.officeHours}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Administrative Email</span>
                <p className="text-sm font-bold text-slate-900 mt-1 font-mono">{adminProfile.email}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Direct Phone Extension</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{adminProfile.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-600" />
              <span>Privileges & Delegated Authorities</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Final Sign-Off on Academic Leaves</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Gate Pass Curfew Override Authorization</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Digital Seal Signing for Bonafide / NOC</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Campus Notice Board Broadcast Broadcast</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Administrator Profile">
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Official Phone Extension
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Office Consultation Hours
            </label>
            <input
              type="text"
              required
              value={officeHours}
              onChange={(e) => setOfficeHours(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Save Details
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AdminProfilePage;
