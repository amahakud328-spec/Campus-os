import React, { useState } from 'react';
import {
  BellRing,
  Trash2,
  Send,
  Upload,
  FileText
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const NoticeAdminPage = () => {
  const { notices, addNotice, deleteNotice, showToast } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Students');
  const [priority, setPriority] = useState('Normal');
  const [attachmentName, setAttachmentName] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const categories = [
    'Academic',
    'Examination',
    'Events',
    'Placement',
    'Hostel',
    'Fees',
    'Administrative'
  ];

  const audiences = [
    'All Students',
    'Specific Department (CSE/IT)',
    'Specific Year (3rd & 4th Year)',
    'Hostel Students (Blocks A, B, C)',
    'Faculty & Staff'
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      showToast(`Attachment attached: ${file.name}`, 'info');
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please enter both title and description', 'warning');
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      addNotice({
        title,
        category,
        description,
        targetAudience,
        priority,
        author: 'Chief Dean Office',
        attachmentName: attachmentName || 'Official_Circular.pdf'
      });

      setTitle('');
      setDescription('');
      setAttachmentName('');
      setIsPublishing(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Campus Notice & Circular Broadcast
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Publish verified circulars, exam notifications, placement alerts, and broadcast instant push notices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notice Creation Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BellRing className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Create New Notice</h3>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Notice Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule for Mid-Term Examination..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High / Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                >
                  {audiences.map((aud, idx) => (
                    <option key={idx} value={aud}>
                      {aud}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Notice Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide the complete circular details and instructions for students..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Attachment PDF (Optional)
                </label>
                <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/80 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <Upload className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 mb-1" />
                  <span className="text-[11px] font-semibold text-slate-600">
                    {attachmentName ? attachmentName : 'Attach Official Circular PDF'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => showToast('Draft saved locally!', 'info')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
                >
                  Save Draft
                </button>

                <button
                  type="submit"
                  disabled={isPublishing}
                  className="flex-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPublishing ? 'Broadcasting...' : 'Publish Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Published Notices Management List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <h3 className="font-bold text-base text-slate-900">Active Published Circulars</h3>
            <span className="text-xs text-slate-500 font-semibold">{notices.length} notices</span>
          </div>

          {notices.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {n.category}
                  </span>
                  {n.priority === 'High' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      Urgent Priority
                    </span>
                  )}
                  <span className="text-slate-400 text-xs">Target: {n.targetAudience || 'All'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">{n.date}</span>
                  <button
                    onClick={() => deleteNotice(n.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{n.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
                {n.description}
              </p>

              {n.attachmentName && (
                <div className="text-[11px] text-indigo-700 font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Attached: {n.attachmentName}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NoticeAdminPage;
