export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  TELUGU = 'te',
  TAMIL = 'ta',
  KANNADA = 'kn',
  MALAYALAM = 'ml',
  MARATHI = 'mr',
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

export enum HomeworkStatus {
  ASSIGNED = 'assigned',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  OVERDUE = 'overdue',
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  preferredLanguage: Language;
  avatarUrl?: string;
  schoolId?: string;
  school?: School;
  isActive: boolean;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  address?: string;
  district?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  principalName?: string;
}

export interface Class {
  id: string;
  name: string;
  section?: string;
  grade?: string;
  teacherId?: string;
  schoolId: string;
  school?: School;
}

export interface Student {
  id: string;
  name: string;
  rollNumber?: string;
  parentId?: string;
  classId: string;
  class?: Class;
  isActive: boolean;
}

export interface Homework {
  id: string;
  title: string;
  description?: string;
  subject?: string;
  dueDate: string;
  status: HomeworkStatus;
  attachmentUrl?: string;
  teacherId: string;
  classId: string;
  class?: Class;
  createdAt: string;
}

export interface Attendance {
  id: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
  studentId: string;
  student?: Student;
  classId: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'audio' | 'document';
  mediaUrl?: string;
  senderId: string;
  sender?: User;
  recipientId?: string;
  classId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'homework' | 'attendance' | 'message' | 'announcement' | 'fee';
  recipientId: string;
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
