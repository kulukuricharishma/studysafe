export interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM – 11:00 AM" or "10:00 AM"
  durationMinutes: number; // e.g. 60
  completed: boolean;
}

export interface SubjectItem {
  id: string;
  name: string;
  topicsCount: number;
  completedTopicsCount: number;
  color?: string;
  topics?: string[];
}

export interface DayStudyRecord {
  day: string; // "Monday", "Tuesday", etc.
  shortDay: string; // "Mon", "Tue"
  hours: number;
  date: string;
}

export interface StudentProfile {
  name: string;
  title: string;
  avatarUrl: string;
  currentStreak: number;
}

export type ActiveTab = 'home' | 'dashboard' | 'subjects' | 'timer' | 'progress';
