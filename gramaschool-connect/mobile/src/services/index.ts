import api from './api';
import {
  AuthResponse,
  User,
  School,
  Class,
  Student,
  Homework,
  Attendance,
  Message,
  Notification,
} from '../types';

// Auth
export const authService = {
  verifyOtp: (idToken: string, name?: string, role?: string, schoolId?: string) =>
    api.post<AuthResponse>('/auth/verify-otp', { idToken, name, role, schoolId }),
  getProfile: () => api.get<User>('/auth/profile'),
};

// Schools
export const schoolsService = {
  getAll: () => api.get<School[]>('/schools'),
  getById: (id: string) => api.get<School>(`/schools/${id}`),
};

// Classes
export const classesService = {
  getAll: (schoolId?: string) =>
    api.get<Class[]>('/classes', { params: { schoolId } }),
  getById: (id: string) => api.get<Class>(`/classes/${id}`),
};

// Students
export const studentsService = {
  getAll: (classId?: string) =>
    api.get<Student[]>('/students', { params: { classId } }),
  getById: (id: string) => api.get<Student>(`/students/${id}`),
  getByParent: (parentId: string) =>
    api.get<Student[]>(`/students?parentId=${parentId}`),
};

// Homework
export const homeworkService = {
  getAll: (classId?: string) =>
    api.get<Homework[]>('/homework', { params: { classId } }),
  getById: (id: string) => api.get<Homework>(`/homework/${id}`),
  create: (data: Partial<Homework>) => api.post<Homework>('/homework', data),
  update: (id: string, data: Partial<Homework>) =>
    api.put<Homework>(`/homework/${id}`, data),
  delete: (id: string) => api.delete(`/homework/${id}`),
};

// Attendance
export const attendanceService = {
  mark: (data: { classId: string; date: string; entries: Array<{ studentId: string; status: string; remarks?: string }> }) =>
    api.post<Attendance[]>('/attendance', data),
  getByClass: (classId: string, date: string) =>
    api.get<Attendance[]>(`/attendance/class/${classId}`, { params: { date } }),
  getByStudent: (studentId: string) =>
    api.get<Attendance[]>(`/attendance/student/${studentId}`),
  getSummary: (classId: string, month: number, year: number) =>
    api.get(`/attendance/summary/${classId}`, { params: { month, year } }),
};

// Messages
export const messagesService = {
  send: (data: Partial<Message>) => api.post<Message>('/messages', data),
  getByClass: (classId: string) =>
    api.get<Message[]>(`/messages/class/${classId}`),
  getConversation: (user1: string, user2: string) =>
    api.get<Message[]>('/messages/conversation', { params: { user1, user2 } }),
  markAsRead: (id: string) => api.patch(`/messages/${id}/read`),
};

// Notifications
export const notificationsService = {
  getAll: () => api.get<Notification[]>('/notifications'),
  getUnreadCount: () => api.get<number>('/notifications/unread-count'),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};
