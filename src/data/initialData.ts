import { StudyTask, SubjectItem, DayStudyRecord, StudentProfile } from '../types';

export const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Alex Chen',
  title: 'Computer Science Student',
  avatarUrl: '/src/assets/images/student_avatar_1790578312832.jpg',
  currentStreak: 5,
};

export const getInitialTasks = (): StudyTask[] => {
  const today = getTodayDateString();
  return [
    {
      id: 'task-1',
      subject: 'Data Structures',
      topic: 'Arrays and Strings',
      date: today,
      time: '10:00 AM – 11:00 AM',
      durationMinutes: 60,
      completed: true,
    },
    {
      id: 'task-2',
      subject: 'Database Management',
      topic: 'SQL Practice',
      date: today,
      time: '2:00 PM – 3:00 PM',
      durationMinutes: 60,
      completed: true,
    },
    {
      id: 'task-3',
      subject: 'Java',
      topic: 'OOP Concepts',
      date: today,
      time: '6:00 PM – 7:00 PM',
      durationMinutes: 60,
      completed: false,
    },
    {
      id: 'task-4',
      subject: 'Operating Systems',
      topic: 'Process Scheduling & Threads',
      date: today,
      time: '8:00 PM – 9:00 PM',
      durationMinutes: 60,
      completed: false,
    },
    {
      id: 'task-5',
      subject: 'Computer Networks',
      topic: 'TCP/IP Model Overview',
      date: today,
      time: '9:30 PM – 10:30 PM',
      durationMinutes: 60,
      completed: false,
    },
  ];
};

export const INITIAL_SUBJECTS: SubjectItem[] = [
  {
    id: 'subj-1',
    name: 'Java',
    topicsCount: 10,
    completedTopicsCount: 6,
    color: '#4F46E5',
    topics: [
      'OOP Concepts & Classes',
      'Inheritance and Polymorphism',
      'Interfaces and Abstract Classes',
      'Exception Handling',
      'Collections Framework',
      'Generics & Enums',
      'Multithreading Basics',
      'Streams & Lambdas',
      'File I/O Operations',
      'JVM Architecture',
    ],
  },
  {
    id: 'subj-2',
    name: 'DBMS',
    topicsCount: 8,
    completedTopicsCount: 4,
    color: '#0284C7',
    topics: [
      'Relational Model & ER Diagrams',
      'SQL Queries & Joins',
      'Database Normalization (1NF to BCNF)',
      'Indexing & B-Trees',
      'Transactions & ACID Properties',
      'Concurrency Control',
      'NoSQL Fundamentals',
      'Stored Procedures & Triggers',
    ],
  },
  {
    id: 'subj-3',
    name: 'Data Structures',
    topicsCount: 10,
    completedTopicsCount: 7,
    color: '#0D9488',
    topics: [
      'Arrays and Strings',
      'Linked Lists (Singly & Doubly)',
      'Stacks and Queues',
      'Binary Search Trees',
      'AVL Trees & Heaps',
      'Hashing & Hash Tables',
      'Graph Representations & Traversals',
      'Dijkstra Algorithm',
      'Dynamic Programming Basics',
      'Sorting Algorithms',
    ],
  },
  {
    id: 'subj-4',
    name: 'Operating Systems',
    topicsCount: 8,
    completedTopicsCount: 4,
    color: '#7C3AED',
    topics: [
      'OS Overview & Dual Mode',
      'Process Scheduling Algorithms',
      'Process Synchronization & Semaphores',
      'Deadlock Handling Strategies',
      'Memory Management & Paging',
      'Virtual Memory & Page Replacement',
      'File Systems & Disk Scheduling',
      'Security & Protection',
    ],
  },
  {
    id: 'subj-5',
    name: 'Computer Networks',
    topicsCount: 7,
    completedTopicsCount: 3,
    color: '#EA580C',
    topics: [
      'OSI and TCP/IP Reference Models',
      'Physical Layer & Transmission Media',
      'Data Link Layer & Framing',
      'IPv4 & IPv6 Subnetting',
      'Routing Algorithms (OSPF, BGP)',
      'Transport Layer (TCP vs UDP)',
      'Application Layer Protocols (HTTP, DNS)',
    ],
  },
];

export const INITIAL_WEEKLY_PROGRESS: DayStudyRecord[] = [
  { day: 'Monday', shortDay: 'Mon', hours: 3.5, date: '2026-09-21' },
  { day: 'Tuesday', shortDay: 'Tue', hours: 4.0, date: '2026-09-22' },
  { day: 'Wednesday', shortDay: 'Wed', hours: 2.5, date: '2026-09-23' },
  { day: 'Thursday', shortDay: 'Thu', hours: 5.0, date: '2026-09-24' },
  { day: 'Friday', shortDay: 'Fri', hours: 3.0, date: '2026-09-25' },
  { day: 'Saturday', shortDay: 'Sat', hours: 4.5, date: '2026-09-26' },
  { day: 'Sunday', shortDay: 'Sun', hours: 3.5, date: '2026-09-27' },
];
