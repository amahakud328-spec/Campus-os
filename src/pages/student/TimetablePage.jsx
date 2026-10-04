import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { timetableData } from '../../data/mockData';

export const TimetablePage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = 'Wednesday'; // matching demo date
  const [selectedDay, setSelectedDay] = useState(todayDay);
  const [viewMode, setViewMode] = useState('day'); // 'day' or 'week'

  const colorStyles = {
    indigo: {
      card: 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-300',
      badge: 'bg-indigo-100 text-indigo-700',
      dot: 'bg-indigo-600'
    },
    cyan: {
      card: 'bg-cyan-50/50 border-cyan-100 hover:border-cyan-300',
      badge: 'bg-cyan-100 text-cyan-700',
      dot: 'bg-cyan-600'
    },
    emerald: {
      card: 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-700',
      dot: 'bg-emerald-600'
    },
    amber: {
      card: 'bg-amber-50/50 border-amber-100 hover:border-amber-300',
      badge: 'bg-amber-100 text-amber-700',
      dot: 'bg-amber-600'
    },
    purple: {
      card: 'bg-purple-50/50 border-purple-100 hover:border-purple-300',
      badge: 'bg-purple-100 text-purple-700',
      dot: 'bg-purple-600'
    },
    rose: {
      card: 'bg-rose-50/50 border-rose-100 hover:border-rose-300',
      badge: 'bg-rose-100 text-rose-700',
      dot: 'bg-rose-600'
    },
    slate: {
      card: 'bg-slate-50 border-slate-200 hover:border-slate-300',
      badge: 'bg-slate-200 text-slate-700',
      dot: 'bg-slate-600'
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Class Timetable
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Weekly academic schedule for Computer Science & Engineering (3rd Year, Semester 6).
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-xs self-start">
          <button
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'day'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Day View
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'week'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Full Week Grid
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const isToday = day === todayDay;
          const classCount = timetableData[day]?.length || 0;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[120px] p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : isToday
                  ? 'bg-indigo-50/70 border-indigo-200 text-slate-900 hover:bg-indigo-100/50'
                  : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? 'text-white' : isToday ? 'text-indigo-700' : 'text-slate-800'
                  }`}
                >
                  {day}
                </span>
                {isToday && (
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    Today
                  </span>
                )}
              </div>
              <p
                className={`text-[11px] mt-1 ${
                  isSelected ? 'text-indigo-100' : 'text-slate-400'
                }`}
              >
                {classCount} classes
              </p>
            </button>
          );
        })}
      </div>

      {/* Day View */}
      {viewMode === 'day' ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedDay}'s Classes</h3>
                <p className="text-xs text-slate-500">
                  {selectedDay === todayDay ? 'Currently active day schedule' : `Schedule for ${selectedDay}`}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {timetableData[selectedDay]?.length || 0} Lectures scheduled
            </span>
          </div>

          <div className="space-y-4">
            {timetableData[selectedDay]?.map((slot, index) => {
              const style = colorStyles[slot.color] || colorStyles.indigo;
              return (
                <div
                  key={index}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${style.card}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center font-bold text-slate-700 shrink-0 mt-0.5">
                      {index + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${style.badge}`}>
                          {slot.type}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-400">
                          {slot.code}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mt-1.5 leading-tight">
                        {slot.subject}
                      </h4>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {slot.teacher}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-indigo-700">
                          <MapPin className="w-3.5 h-3.5" />
                          {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Full Week Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {days.map((day) => {
            const isToday = day === todayDay;
            return (
              <div
                key={day}
                className={`bg-white rounded-2xl p-5 border shadow-xs flex flex-col ${
                  isToday ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-100'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h4 className="font-bold text-sm text-slate-900">{day}</h4>
                  {isToday && (
                    <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                      Today
                    </span>
                  )}
                </div>

                <div className="space-y-3 flex-1">
                  {timetableData[day]?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold">{item.time}</span>
                        <span className="font-medium text-indigo-600">{item.room}</span>
                      </div>
                      <p className="font-bold text-slate-900 leading-snug">{item.subject}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{item.teacher}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default TimetablePage;
