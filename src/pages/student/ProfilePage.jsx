import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  BookOpen,
  Calendar,
  Lock,
  Edit,
  Shield,
  CheckCircle2,
  KeyRound,
  GraduationCap
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import Modal from '../../components/common/Modal';

export const ProfilePage = () => {
  const { studentProfile, setStudentProfile, showToast } = useCampus();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  // Edit form state
  const [phone, setPhone] = useState(studentProfile.phone);
  const [emergencyContact, setEmergencyContact] = useState(studentProfile.emergencyContact);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudentProfile((prev) => ({
      ...prev,
      phone,
      emergencyContact
    }));
    setIsEditOpen(false);
    showToast('Student profile information updated successfully!', 'success');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setIsPasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Campus account password changed successfully!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Student Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Official institutional identity, registered academic credentials, and personal contact records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Avatar & Primary Identity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs text-center flex flex-col items-center">
            <div className="relative">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-28 h-28 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mt-4">{studentProfile.name}</h3>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-1">
              {studentProfile.studentId}
            </span>

            <p className="text-xs text-slate-500 mt-2 font-medium">
              {studentProfile.degree} in {studentProfile.department}
            </p>

            <div className="w-full mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-400">Cumulative GPA</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{studentProfile.cgpa} / 10</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-400">Academic Standing</span>
                <p className="text-xl font-black text-emerald-600 mt-0.5">Good</p>
              </div>
            </div>

            <div className="w-full mt-6 space-y-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Contact Details</span>
              </button>

              <button
                onClick={() => setIsPasswordOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Details Grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Academic Enrollment Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Department</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.department}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Enrolled Program</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.degree} (4-Year Undergraduate)</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Current Year & Term</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.year} • {studentProfile.semester}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Assigned Faculty Mentor</span>
                <p className="text-sm font-bold text-indigo-700 mt-1">{studentProfile.academicMentor}</p>
              </div>
            </div>
          </div>

          {/* Contact & Residential Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <span>Hostel & Contact Records</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Official Student Email</span>
                <p className="text-sm font-bold text-slate-900 mt-1 font-mono">{studentProfile.email}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Primary Mobile Number</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.phone}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Hostel Campus Allocation</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.hostel}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Allocated Room</span>
                <p className="text-sm font-bold text-indigo-700 mt-1">{studentProfile.room}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Emergency Guardian Contact</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.emergencyContact}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold text-[11px] uppercase">Blood Group</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{studentProfile.bloodGroup}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Update Contact Information">
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mobile Phone Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Emergency Parent / Guardian Contact
            </label>
            <input
              type="text"
              required
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
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
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} title="Change Portal Password">
        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPasswordOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Update Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ProfilePage;
