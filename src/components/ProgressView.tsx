import React, { useState } from 'react';
import { DayStudyRecord, StudyTask } from '../types';
import { Clock, CheckSquare, Flame, TrendingUp, Plus, Calendar } from 'lucide-react';

interface ProgressViewProps {
  weeklyRecords: DayStudyRecord[];
  allTasks: StudyTask[];
  currentStreak: number;
  onUpdateDailyHours: (dayIndex: number, newHours: number) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  weeklyRecords,
  allTasks,
  currentStreak,
  onUpdateDailyHours,
}) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);

  // Compute Total Study Hours
  const totalStudyHours = weeklyRecords.reduce((acc, curr) => acc + curr.hours, 0);

  // Total completed tasks
  const totalCompletedTasks = allTasks.filter((t) => t.completed).length;

  // Max hours in week for proportional bar scaling (min 6 hrs scale)
  const maxHours = Math.max(...weeklyRecords.map((r) => r.hours), 6);

  return (
    <div className="py-6 sm:py-8 space-y-8 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Progress
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your weekly study consistency and achievements.
        </p>
      </div>

      {/* Three Highlight Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Study Hours */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Study Hours</span>
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalStudyHours.toFixed(1)} hrs
            </span>
          </div>
        </div>

        {/* Tasks Completed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Tasks Completed</span>
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalCompletedTasks}
            </span>
          </div>
        </div>

        {/* Current Study Streak */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Current Study Streak</span>
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {currentStreak} Days 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Visual Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Hours Studied Each Day
            </h2>
            <p className="text-xs text-slate-500">Weekly breakdown across Monday to Sunday</p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Daily Target: <span className="font-semibold text-slate-700">4.0 hrs</span>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="pt-4">
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 border-b border-slate-200 pb-2 px-2 sm:px-4">
            {weeklyRecords.map((record, idx) => {
              const heightPercent = Math.min(100, Math.round((record.hours / maxHours) * 100));
              const isSelected = selectedDayIdx === idx;
              const isToday = idx === 6; // Sunday in standard list or check today

              return (
                <div
                  key={record.day}
                  onClick={() => setSelectedDayIdx(isSelected ? null : idx)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                >
                  {/* Hours Label on Top */}
                  <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-600 tabular-nums group-hover:text-indigo-600 transition-colors">
                    {record.hours}h
                  </span>

                  {/* Vertical Bar */}
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        isToday
                          ? 'bg-indigo-600 group-hover:bg-indigo-700'
                          : 'bg-indigo-400 group-hover:bg-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day Names Row */}
          <div className="flex justify-between gap-2 sm:gap-6 pt-3 px-2 sm:px-4">
            {weeklyRecords.map((record) => (
              <div key={record.day} className="flex-1 text-center">
                <span className="hidden sm:inline text-xs font-semibold text-slate-700">
                  {record.day}
                </span>
                <span className="sm:hidden text-xs font-semibold text-slate-700">
                  {record.shortDay}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Quick Adjust / Day Detail */}
        {selectedDayIdx !== null && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
            <span className="font-semibold text-slate-800">
              Update hours for {weeklyRecords[selectedDayIdx].day}:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onUpdateDailyHours(
                    selectedDayIdx,
                    Math.max(0, Number((weeklyRecords[selectedDayIdx].hours - 0.5).toFixed(1)))
                  )
                }
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="font-mono font-bold text-sm text-indigo-700 min-w-[50px] text-center">
                {weeklyRecords[selectedDayIdx].hours} hrs
              </span>
              <button
                onClick={() =>
                  onUpdateDailyHours(
                    selectedDayIdx,
                    Number((weeklyRecords[selectedDayIdx].hours + 0.5).toFixed(1))
                  )
                }
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Motivation Quote */}
      <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3 text-indigo-900 text-sm">
        <Calendar className="w-5 h-5 text-indigo-600 shrink-0" />
        <p className="font-medium">
          Consistency is the key to mastering complex subjects. Keep showing up every day!
        </p>
      </div>
    </div>
  );
};
