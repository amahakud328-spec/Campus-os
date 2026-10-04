import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  isPositive = true,
  icon: Icon,
  color = 'indigo', // indigo, cyan, emerald, amber, purple, rose
  onClick
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50 text-indigo-600',
      border: 'hover:border-indigo-200',
      gradient: 'from-indigo-500 to-blue-600'
    },
    cyan: {
      bg: 'bg-cyan-50 text-cyan-600',
      border: 'hover:border-cyan-200',
      gradient: 'from-cyan-500 to-blue-500'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-200',
      gradient: 'from-emerald-500 to-teal-600'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-200',
      gradient: 'from-amber-500 to-orange-500'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'hover:border-purple-200',
      gradient: 'from-purple-500 to-indigo-600'
    },
    rose: {
      bg: 'bg-rose-50 text-rose-600',
      border: 'hover:border-rose-200',
      gradient: 'from-rose-500 to-red-600'
    }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200 ${
        scheme.border
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">{title}</p>
          <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">{value}</h4>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${scheme.bg} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(trend || subtitle) && (
        <div className="mt-3.5 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center font-semibold px-2 py-0.5 rounded-full ${
                isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {trend}
            </span>
          )}
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
export default StatCard;
