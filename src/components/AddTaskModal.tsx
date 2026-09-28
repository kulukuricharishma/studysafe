import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, BookOpen, FileText } from 'lucide-react';
import { SubjectItem, StudyTask } from '../types';
import { getTodayDateString } from '../data/initialData';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: SubjectItem[];
  onAddTask: (task: Omit<StudyTask, 'id' | 'completed'>) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  subjects,
  onAddTask,
}) => {
  const [subject, setSubject] = useState(subjects[0]?.name || 'Data Structures');
  const [customSubject, setCustomSubject] = useState('');
  const [isCustomSubject, setIsCustomSubject] = useState(false);
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = isCustomSubject ? customSubject.trim() : subject.trim();

    if (!finalSubject) {
      setError('Please choose or enter a subject name');
      return;
    }
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    const timeString = `${startTime} – ${endTime}`;

    onAddTask({
      subject: finalSubject,
      topic: topic.trim(),
      date,
      time: timeString,
      durationMinutes: Number(durationMinutes) || 60,
    });

    // Reset and close
    setTopic('');
    setCustomSubject('');
    setIsCustomSubject(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Add Study Task</h2>
              <p className="text-xs text-slate-500">Plan a focused study session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Subject
            </label>
            {!isCustomSubject ? (
              <div className="flex gap-2">
                <select
                  value={subject}
                  onChange={(e) => {
                    if (e.target.value === '__CUSTOM__') {
                      setIsCustomSubject(true);
                    } else {
                      setSubject(e.target.value);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="__CUSTOM__">+ New Subject...</option>
                </select>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Artificial Intelligence"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsCustomSubject(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-300 shrink-0 cursor-pointer"
                >
                  Choose Existing
                </button>
              </div>
            )}
          </div>

          {/* Topic Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              Topic
            </label>
            <input
              type="text"
              placeholder="e.g. Binary Search Trees & Traversal"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Duration (minutes)
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value={30}>30 mins</option>
                <option value={45}>45 mins</option>
                <option value={60}>60 mins (1 hr)</option>
                <option value={90}>90 mins (1.5 hrs)</option>
                <option value={120}>120 mins (2 hrs)</option>
              </select>
            </div>
          </div>

          {/* Time Span Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Time Slot
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 text-center font-mono tabular-nums focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="11:00 AM"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 text-center font-mono tabular-nums focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
