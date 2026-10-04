import React from 'react';

export const CircularProgress = ({ percentage = 82, size = 120, strokeWidth = 10, subtitle = "Overall" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#10b981'; // green
  if (percentage < 75) strokeColor = '#f59e0b'; // warning
  if (percentage < 65) strokeColor = '#ef4444'; // danger

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-slate-900 leading-none">{percentage}%</span>
          {subtitle && <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-1">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};
export default CircularProgress;
