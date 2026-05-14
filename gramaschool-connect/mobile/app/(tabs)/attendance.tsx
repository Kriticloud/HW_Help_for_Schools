import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AttendanceStatus } from '../../src/types';

interface StudentAttendance {
  id: string;
  name: string;
  rollNumber: string;
  status: AttendanceStatus | null;
}

const mockStudents: StudentAttendance[] = [
  { id: '1', name: 'Aarav Sharma', rollNumber: '01', status: AttendanceStatus.PRESENT },
  { id: '2', name: 'Priya Patel', rollNumber: '02', status: AttendanceStatus.PRESENT },
  { id: '3', name: 'Rahul Kumar', rollNumber: '03', status: AttendanceStatus.ABSENT },
  { id: '4', name: 'Ananya Reddy', rollNumber: '04', status: AttendanceStatus.PRESENT },
  { id: '5', name: 'Vikram Singh', rollNumber: '05', status: AttendanceStatus.LATE },
  { id: '6', name: 'Meera Nair', rollNumber: '06', status: null },
  { id: '7', name: 'Arjun Das', rollNumber: '07', status: null },
  { id: '8', name: 'Kavitha Iyer', rollNumber: '08', status: null },
];

const statusIcon: Record<AttendanceStatus, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  [AttendanceStatus.PRESENT]: { icon: 'checkmark-circle', color: '#10B981' },
  [AttendanceStatus.ABSENT]: { icon: 'close-circle', color: '#EF4444' },
  [AttendanceStatus.LATE]: { icon: 'time', color: '#F59E0B' },
};

export default function AttendanceScreen() {
  const [students, setStudents] = useState(mockStudents);
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const toggleStatus = (id: string, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === status ? null : status } : s,
      ),
    );
  };

  const marked = students.filter((s) => s.status !== null).length;
  const present = students.filter((s) => s.status === AttendanceStatus.PRESENT).length;

  return (
    <View style={styles.container}>
      {/* Date & Summary */}
      <View style={styles.header}>
        <Text style={styles.date}>{today}</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNum}>{marked}/{students.length}</Text>
            <Text style={styles.summaryLabel}>Marked</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNum, { color: '#10B981' }]}>{present}</Text>
            <Text style={styles.summaryLabel}>Present</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNum, { color: '#EF4444' }]}>
              {students.filter((s) => s.status === AttendanceStatus.ABSENT).length}
            </Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>
        </View>
      </View>

      {/* Student List */}
      <ScrollView style={styles.list}>
        {students.map((student) => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{student.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.rollNum}>Roll #{student.rollNumber}</Text>
              </View>
            </View>
            <View style={styles.statusButtons}>
              {([AttendanceStatus.PRESENT, AttendanceStatus.ABSENT, AttendanceStatus.LATE] as const).map((st) => {
                const cfg = statusIcon[st];
                const active = student.status === st;
                return (
                  <TouchableOpacity
                    key={st}
                    style={[styles.statusBtn, active && { backgroundColor: cfg.color + '20' }]}
                    onPress={() => toggleStatus(student.id, st)}
                  >
                    <Ionicons
                      name={cfg.icon}
                      size={22}
                      color={active ? cfg.color : '#CBD5E1'}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Submit */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Save Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  date: { fontSize: 15, color: '#64748B', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', gap: 16 },
  summaryItem: { alignItems: 'center' },
  summaryNum: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  summaryLabel: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  list: { flex: 1, padding: 16 },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' },
  studentName: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  rollNum: { fontSize: 12, color: '#94A3B8' },
  statusButtons: { flexDirection: 'row', gap: 8 },
  statusBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  submitBtn: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
