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

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export enum NotificationType {
  HOMEWORK = 'homework',
  ATTENDANCE = 'attendance',
  MESSAGE = 'message',
  ANNOUNCEMENT = 'announcement',
  FEE = 'fee',
}
