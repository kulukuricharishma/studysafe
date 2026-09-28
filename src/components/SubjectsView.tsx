import React, { useState } from 'react';
import { SubjectItem } from '../types';
import { BookOpen, Plus, CheckCircle2, ChevronRight, ChevronDown, Check, Trash2 } from 'lucide-react';

interface SubjectsViewProps {
  subjects: SubjectItem[];
  onAddSubject: (name: string, totalTopics: number) => void;
  onUpdateSubjectProgress: (subjectId: string, completedTopicsCount: number) => void;
  onDeleteSubject: (subjectId: string) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  onAddSubject,
  onUpdateSubjectProgress,
  onDeleteSubject,
}) => {
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(subjects[0]?.id || null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newTopicsCount, setNewTopicsCount] = useState(8);

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    onAddSubject(newSubjectName.trim(), Math.max(1, Number(newTopicsCount) || 5));
    setNewSubjectName('');
    setIsAddingNew(false);
  };

  // Helper to generate the exact visual block progress as requested: "██████░░░░ 60%"
  const getBlockProgressBar = (percentage: number) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percentage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <div className="py-6 sm:py-8 space-y-8 text-left">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Subjects
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track syllabus completion and key topics across all your active courses.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Add Subject Inline Form */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateSubject}
          className="bg-white rounded-2xl border border-indigo-200 p-5 shadow-xs space-y-4"
        >
          <h3 className="text-sm font-bold text-slate-900">Add a New Subject</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Subject Name
              </label>
              <input
                type="text"
                placeholder="e.g. Artificial Intelligence"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Number of Topics
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={newTopicsCount}
                onChange={(e) => setNewTopicsCount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
            >
              Save Subject
            </button>
          </div>
        </form>
      )}

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((sub) => {
          const percentage =
            sub.topicsCount > 0
              ? Math.round((sub.completedTopicsCount / sub.topicsCount) * 100)
              : 0;
          const isExpanded = expandedSubjectId === sub.id;
          const blockText = getBlockProgressBar(percentage);

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: sub.color || '#4F46E5' }}
                    >
                      {sub.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {sub.topicsCount} Topics total · {sub.completedTopicsCount} completed
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteSubject(sub.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                    title="Remove subject"
                    aria-label="Remove subject"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress bar visual */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Progress</span>
                    <span className="font-bold text-indigo-600 font-mono tabular-nums">
                      {percentage}%
                    </span>
                  </div>

                  {/* Visual Smooth Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: sub.color || '#4F46E5',
                      }}
                    />
                  </div>

                  {/* Character Block Display from Prompt (e.g. ██████░░░░ 60%) */}
                  <div className="font-mono text-xs text-slate-400 select-all tracking-wider py-0.5">
                    <span className="text-slate-700">{blockText}</span>{' '}
                    <span className="font-bold text-slate-800">{percentage}%</span>
                  </div>
                </div>

                {/* Interactive Topic Counter / Adjuster */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Quick Progress Update:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        onUpdateSubjectProgress(
                          sub.id,
                          Math.max(0, sub.completedTopicsCount - 1)
                        )
                      }
                      disabled={sub.completedTopicsCount <= 0}
                      className="w-6 h-6 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-semibold text-slate-700 min-w-[32px] text-center">
                      {sub.completedTopicsCount}/{sub.topicsCount}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateSubjectProgress(
                          sub.id,
                          Math.min(sub.topicsCount, sub.completedTopicsCount + 1)
                        )
                      }
                      disabled={sub.completedTopicsCount >= sub.topicsCount}
                      className="w-6 h-6 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Expand Topics Toggle */}
                {sub.topics && sub.topics.length > 0 && (
                  <button
                    onClick={() =>
                      setExpandedSubjectId(isExpanded ? null : sub.id)
                    }
                    className="w-full flex items-center justify-between text-xs font-medium text-slate-600 hover:text-indigo-600 pt-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Topic Syllabus' : 'View Topic Syllabus'}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Expanded Syllabus Checklist */}
              {isExpanded && sub.topics && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-semibold text-slate-700">Course Syllabus:</p>
                  <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {sub.topics.map((t, idx) => {
                      const isDone = idx < sub.completedTopicsCount;
                      return (
                        <li
                          key={idx}
                          onClick={() => {
                            // clicking toggles completion up to this topic
                            const target = isDone ? idx : idx + 1;
                            onUpdateSubjectProgress(sub.id, target);
                          }}
                          className={`text-xs p-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                            isDone
                              ? 'text-slate-400 bg-slate-50'
                              : 'text-slate-700 hover:bg-indigo-50/60'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                              isDone
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={isDone ? 'line-through' : ''}>{t}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
