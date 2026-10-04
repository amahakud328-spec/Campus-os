import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BellRing,
  Search,
  Calendar,
  User,
  Paperclip,
  Download,
  Eye,
  AlertCircle,
  Sparkles,
  Bookmark,
  Share2,
  Filter
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const NoticesPage = () => {
  const [searchParams] = useSearchParams();
  const { notices, showToast } = useCampus();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNotice, setActiveNotice] = useState(null);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const categories = [
    'All',
    'Important',
    'Academic',
    'Examination',
    'Events',
    'Placement',
    'Hostel',
    'Fees'
  ];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Important' ? n.priority === 'High' : n.category === selectedCategory);

    const matchesQuery =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Campus Notice Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official announcements, examination schedules, event invitations, and circulars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl">
            {notices.length} Active Circulars
          </span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices by title, keyword, or examination code..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-100 font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotices.map((notice) => {
          const isHighPriority = notice.priority === 'High';

          return (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl p-6 border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group ${
                isHighPriority ? 'border-rose-200 ring-1 ring-rose-50' : 'border-slate-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {notice.category}
                  </span>
                  {isHighPriority && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> High Priority
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-4 leading-snug group-hover:text-indigo-600 transition-colors">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{notice.date}</span>
                </div>

                <button
                  onClick={() => setActiveNotice(notice)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  <span>Read Notice</span>
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotices.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <BellRing className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No notices found</h4>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All" categories.</p>
        </div>
      )}

      {/* Notice Reader Modal */}
      <Modal
        isOpen={!!activeNotice}
        onClose={() => setActiveNotice(null)}
        title={activeNotice?.category + ' Circular'}
        maxWidth="max-w-2xl"
      >
        {activeNotice && (
          <div className="space-y-5 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  {activeNotice.category}
                </span>
                {activeNotice.priority === 'High' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    High Priority
                  </span>
                )}
                <span className="text-slate-400 font-mono text-[11px] ml-auto">
                  Doc Ref: #{activeNotice.id}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 leading-tight">
                {activeNotice.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs mt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published {activeNotice.date}
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <User className="w-3.5 h-3.5 text-indigo-500" /> By {activeNotice.author || 'Dean Office'}
                </span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold">
                  Audience: {activeNotice.targetAudience || 'All Students'}
                </span>
              </div>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <p>{activeNotice.description}</p>
              <p className="text-xs text-slate-500 italic mt-3">
                For questions regarding this circular, contact the respective department office or submit a ticket
                through CampusConnect.
              </p>
            </div>

            {activeNotice.attachmentName && (
              <div className="flex items-center justify-between p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-2.5">
                  <Paperclip className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="font-bold text-slate-800 text-xs">{activeNotice.attachmentName}</p>
                    <span className="text-[10px] text-slate-500">Official Signed PDF Document (1.2 MB)</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Downloaded: ${activeNotice.attachmentName}`, 'success')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Notice link copied to clipboard!', 'info');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Circular
              </button>

              <button
                onClick={() => setActiveNotice(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default NoticesPage;
