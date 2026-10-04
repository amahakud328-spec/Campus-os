import React from 'react';
import { Clock, CheckCircle2, XCircle, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const normalized = (status || 'Pending').toLowerCase();

  const styles = {
    pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      icon: Clock,
      label: 'Pending'
    },
    approved: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Approved'
    },
    rejected: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
      icon: XCircle,
      label: 'Rejected'
    },
    processing: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500',
      icon: Loader2,
      label: 'Processing',
      animateIcon: true
    },
    'in progress': {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      dot: 'bg-indigo-500',
      icon: Clock,
      label: 'In Progress'
    },
    resolved: {
      bg: 'bg-teal-50 text-teal-700 border-teal-200',
      dot: 'bg-teal-500',
      icon: Sparkles,
      label: 'Resolved'
    },
    ready: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Ready'
    },
    safe: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Safe'
    },
    warning: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      icon: AlertCircle,
      label: 'Warning'
    },
    high: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
      icon: AlertCircle,
      label: 'High Priority'
    },
    urgent: {
      bg: 'bg-red-100 text-red-800 border-red-300',
      dot: 'bg-red-600',
      icon: AlertCircle,
      label: 'Urgent'
    },
    normal: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      icon: Clock,
      label: 'Normal'
    }
  };

  const current = styles[normalized] || styles.pending;
  const Icon = current.icon;
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs transition-colors ${current.bg} ${sizeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <Icon className={`w-3.5 h-3.5 ${current.animateIcon ? 'animate-spin' : ''}`} />
      <span>{current.label}</span>
    </span>
  );
};
export default StatusBadge;
