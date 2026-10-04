import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useCampus();

  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const bgStyles = {
    success: 'border-emerald-200 bg-white/95 text-slate-800 shadow-emerald-500/10',
    warning: 'border-amber-200 bg-white/95 text-slate-800 shadow-amber-500/10',
    error: 'border-rose-200 bg-white/95 text-slate-800 shadow-rose-500/10',
    info: 'border-blue-200 bg-white/95 text-slate-800 shadow-blue-500/10'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all transform animate-slide-in ${
            bgStyles[toast.type] || bgStyles.info
          }`}
        >
          <div className="flex items-center gap-3">
            {icons[toast.type] || icons.info}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
export default ToastContainer;
