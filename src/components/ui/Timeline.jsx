import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const Timeline = ({ steps = [], currentStepIndex = 0 }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 transition-all duration-500 z-0"
          style={{
            width: `${(Math.max(0, Math.min(currentStepIndex, steps.length - 1)) / (steps.length - 1)) * 100}%`
          }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-xs ${
                  isCompleted
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-50'
                    : isCurrent
                    ? 'bg-white border-2 border-indigo-600 text-indigo-600 ring-4 ring-indigo-100 animate-pulse'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-indigo-600" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <div className="text-center mt-2">
                <p
                  className={`text-xs font-semibold whitespace-nowrap ${
                    isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                {step.timestamp && (
                  <span className="text-[10px] text-slate-500 whitespace-nowrap block">{step.timestamp}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Timeline;
