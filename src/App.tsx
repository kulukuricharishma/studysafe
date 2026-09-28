/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, StudyTask, SubjectItem, DayStudyRecord, StudentProfile } from './types';
import {
  getInitialTasks,
  INITIAL_SUBJECTS,
  INITIAL_WEEKLY_PROGRESS,
  INITIAL_PROFILE,
  getTodayDateString,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { Dashboard } from './components/Dashboard';
import { SubjectsView } from './components/SubjectsView';
import { TimerView } from './components/TimerView';
import { ProgressView } from './components/ProgressView';
import { AddTaskModal } from './components/AddTaskModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const todayDateStr = getTodayDateString();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Modal states
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Persistent Tasks state
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('studyspace_tasks');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return getInitialTasks();
  });

  // Persistent Subjects state
  const [subjects, setSubjects] = useState<SubjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('studyspace_subjects');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SUBJECTS;
  });

  // Persistent Weekly Progress state
  const [weeklyProgress, setWeeklyProgress] = useState<DayStudyRecord[]>(() => {
    try {
      const saved = localStorage.getItem('studyspace_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_WEEKLY_PROGRESS;
  });

  // Student Profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('studyspace_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PROFILE;
  });

  // Save to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem('studyspace_tasks', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('studyspace_subjects', JSON.stringify(subjects));
    } catch {
      // ignore
    }
  }, [subjects]);

  useEffect(() => {
    try {
      localStorage.setItem('studyspace_progress', JSON.stringify(weeklyProgress));
    } catch {
      // ignore
    }
  }, [weeklyProgress]);

  useEffect(() => {
    try {
      localStorage.setItem('studyspace_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Handlers for Task management
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newCompleted = !t.completed;
          return { ...t, completed: newCompleted };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleAddTask = (newTaskData: Omit<StudyTask, 'id' | 'completed'>) => {
    const newTask: StudyTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);

    // If subject doesn't exist yet, add it
    const existingSubject = subjects.find(
      (s) => s.name.toLowerCase() === newTaskData.subject.toLowerCase()
    );
    if (!existingSubject) {
      const newSub: SubjectItem = {
        id: `subj-${Date.now()}`,
        name: newTaskData.subject,
        topicsCount: 1,
        completedTopicsCount: 0,
        color: '#4F46E5',
        topics: [newTaskData.topic],
      };
      setSubjects((prev) => [...prev, newSub]);
    } else if (existingSubject.topics && !existingSubject.topics.includes(newTaskData.topic)) {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === existingSubject.id
            ? {
                ...s,
                topicsCount: s.topicsCount + 1,
                topics: [...(s.topics || []), newTaskData.topic],
              }
            : s
        )
      );
    }
  };

  // Handlers for Subjects
  const handleAddSubject = (name: string, totalTopics: number) => {
    const colors = ['#4F46E5', '#0284C7', '#0D9488', '#7C3AED', '#EA580C', '#2563EB'];
    const randomColor = colors[subjects.length % colors.length];

    const newSub: SubjectItem = {
      id: `subj-${Date.now()}`,
      name,
      topicsCount: totalTopics,
      completedTopicsCount: 0,
      color: randomColor,
      topics: Array.from({ length: totalTopics }, (_, i) => `Topic ${i + 1} Fundamentals`),
    };
    setSubjects((prev) => [...prev, newSub]);
  };

  const handleUpdateSubjectProgress = (subjectId: string, completedTopicsCount: number) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, completedTopicsCount } : s))
    );
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
  };

  // Handler when Study Timer completes
  const handleTimerSessionComplete = (minutes: number) => {
    // Add completed minutes to today's study record
    const hours = Number((minutes / 60).toFixed(1));
    setWeeklyProgress((prev) => {
      const copy = [...prev];
      // Index 6 is Sunday (or today)
      const lastIndex = copy.length - 1;
      if (lastIndex >= 0) {
        copy[lastIndex] = {
          ...copy[lastIndex],
          hours: Number((copy[lastIndex].hours + hours).toFixed(1)),
        };
      }
      return copy;
    });
  };

  const handleUpdateDailyHours = (dayIndex: number, newHours: number) => {
    setWeeklyProgress((prev) => {
      const copy = [...prev];
      if (copy[dayIndex]) {
        copy[dayIndex] = { ...copy[dayIndex], hours: newHours };
      }
      return copy;
    });
  };

  const handleResetAllData = () => {
    setTasks(getInitialTasks());
    setSubjects(INITIAL_SUBJECTS);
    setWeeklyProgress(INITIAL_WEEKLY_PROGRESS);
    setProfile(INITIAL_PROFILE);
    localStorage.removeItem('studyspace_tasks');
    localStorage.removeItem('studyspace_subjects');
    localStorage.removeItem('studyspace_progress');
    localStorage.removeItem('studyspace_profile');
  };

  const todayTasks = tasks.filter((t) => t.date === todayDateStr);
  const completedTodayTasks = todayTasks.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-16">
        {activeTab === 'home' && (
          <HomeHero
            onStartStudying={() => setActiveTab('dashboard')}
            setActiveTab={setActiveTab}
            todayTasksCount={todayTasks.length}
            completedTasksCount={completedTodayTasks.length}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            subjects={subjects}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onOpenAddTask={() => setIsAddTaskOpen(true)}
            todayDateStr={todayDateStr}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectsView
            subjects={subjects}
            onAddSubject={handleAddSubject}
            onUpdateSubjectProgress={handleUpdateSubjectProgress}
            onDeleteSubject={handleDeleteSubject}
          />
        )}

        {activeTab === 'timer' && (
          <TimerView onSessionComplete={handleTimerSessionComplete} />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            weeklyRecords={weeklyProgress}
            allTasks={tasks}
            currentStreak={profile.currentStreak}
            onUpdateDailyHours={handleUpdateDailyHours}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">StudySpace</span>
            <span>·</span>
            <span>Personal Study Planner</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Study Plan
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Subjects
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Timer
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Progress
            </button>
          </div>
        </div>
      </footer>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        subjects={subjects}
        onAddTask={handleAddTask}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={(updated) => setProfile((p) => ({ ...p, ...updated }))}
        onResetAllData={handleResetAllData}
      />
    </div>
  );
}
