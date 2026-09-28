import React from 'react';
import { StudyTask, SubjectItem } from '../types';
import { BookOpen, CheckSquare, Clock, Plus, Check, Trash2, Calendar } from 'lucide-react';

interface DashboardProps {
  tasks: StudyTask[];
  subjects: SubjectItem[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenAddTask: () => void;
  todayDateStr: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  subjects,
  onToggleTask,
  onDeleteTask,
  onOpenAddTask,
  todayDateStr,
}) => {
  // Compute greeting based on local hour
  const currentHour = new Date().getHours();
  let greeting = 'Good Morning 👋';
  if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon 👋';
  } else if (currentHour >= 17) {
    greeting = 'Good Evening 👋';
  }

  // Filter tasks for today
  const todayTasks = tasks.filter((t) => t.date === todayDateStr);
  const completedTodayTasks = todayTasks.filter((t) => t.completed);
  const progressPercent =
    todayTasks.length > 0
      ? Math.round((completedTodayTasks.length / todayTasks.length) * 100)
      : 0;

  // Study hours completed today
  const totalCompletedMinutes = completedTodayTasks.reduce(
    (acc, t) => acc + (t.durationMinutes || 60),
    0
  );
  const totalHoursToday = (totalCompletedMinutes / 60).toFixed(1);

  return (
    <div className="py-6 sm:py-8 space-y-8 text-left">
      {/* Header Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {greeting}
          </h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>

        <button
          onClick={onOpenAddTask}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Today's Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900">Today’s Progress</span>
          </div>
          <span className="text-sm font-bold text-indigo-600 font-mono tabular-nums">
            {progressPercent}% Completed
          </span>
        </div>

        {/* Clean Modern Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {completedTodayTasks.length} of {todayTasks.length} sessions completed. Keep up the great pace!
        </p>
      </div>

      {/* Three Small Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Subjects */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">📚 Subjects</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {subjects.length} Active
            </span>
          </div>
        </div>

        {/* Card 2: Tasks Completed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">✅ Tasks Completed</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {completedTodayTasks.length} / {todayTasks.length}
            </span>
          </div>
        </div>

        {/* Card 3: Study Hours */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">⏰ Study Hours</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalHoursToday} hrs
            </span>
          </div>
        </div>
      </div>

      {/* Today's Study Plan Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Today’s Study Plan
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {todayTasks.length} {todayTasks.length === 1 ? 'task' : 'tasks'} scheduled
          </span>
        </div>

        {todayTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No study tasks planned for today</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your subjects and study topics to keep yourself accountable and organized.
            </p>
            <button
              onClick={onOpenAddTask}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Your First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayTasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-2xl border transition-all duration-150 p-5 flex flex-col justify-between shadow-xs ${
                    task.completed
                      ? 'border-emerald-200/80 bg-emerald-50/20'
                      : 'border-slate-200/90 hover:border-indigo-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Subject & Action Checkbox */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-indigo-600">
                          {task.subject}
                        </span>
                        <h3
                          className={`text-base font-bold transition-all ${
                            task.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-900'
                          }`}
                        >
                          {task.topic}
                        </h3>
                      </div>

                      {/* Custom Checkbox */}
                      <button
                        type="button"
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5 ${
                          task.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white hover:border-indigo-500'
                        }`}
                        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        aria-label={`Mark ${task.topic} completed`}
                      >
                        {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                    </div>

                    {/* Time & Duration */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.time}</span>
                      <span>·</span>
                      <span>{task.durationMinutes}m</span>
                    </div>
                  </div>

                  {/* Card Bottom / Delete Button */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span
                      className={`font-medium ${
                        task.completed ? 'text-emerald-600' : 'text-slate-500'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Upcoming'}
                    </span>

                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                      title="Delete task"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
