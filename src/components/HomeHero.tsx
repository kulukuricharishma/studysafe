import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock, BarChart3, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface HomeHeroProps {
  onStartStudying: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  todayTasksCount: number;
  completedTasksCount: number;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartStudying,
  setActiveTab,
  todayTasksCount,
  completedTasksCount,
}) => {
  return (
    <div className="py-8 md:py-14 space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 md:p-14 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple Student Productivity</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                StudySpace
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 tracking-tight">
                “Plan your study. Stay focused. Make progress.”
              </p>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Organize your subjects, plan your study sessions, and keep track of your daily progress.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onStartStudying}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-sm hover:bg-indigo-700 active:scale-[0.99] transition-all cursor-pointer group"
              >
                <span>Start Studying</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('timer')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-base hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Open Focus Timer</span>
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {completedTasksCount} of {todayTasksCount} tasks done today
              </span>
              <span>·</span>
              <span>Distraction-free environment</span>
            </div>
          </div>

          {/* Right Column: Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm aspect-4/3 flex items-center justify-center">
              <img
                src="/src/assets/images/study_hero_illustration_1790578297659.jpg"
                alt="Student studying comfortably at desk illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback styled SVG container if image fails to render
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="p-8 text-center flex flex-col items-center justify-center space-y-3">
                        <div class="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h3 class="text-base font-semibold text-slate-800">Your Study Haven</h3>
                        <p class="text-xs text-slate-500">Every goal starts with a single focused hour.</p>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Quick Benefit Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          onClick={() => setActiveTab('dashboard')}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Daily Study Plan</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Break your daily syllabus into clear, manageable time blocks with checkboxes.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('subjects')}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Subject Mastery</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Monitor progress bars across your key courses from Java to Data Structures.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('timer')}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">25-Minute Focus</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Stay in the zone using the minimal study timer without distraction or clutter.
          </p>
        </div>
      </div>
    </div>
  );
};
