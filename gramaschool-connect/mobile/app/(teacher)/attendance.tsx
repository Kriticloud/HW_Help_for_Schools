import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AttendanceStatus } from '../../src/types';

const students = [
  { id: '1', name: 'Aarav Sharma', roll: '01', status: null as AttendanceStatus | null },
  { id: '2', name: 'Priya Patel', roll: '02', status: null as AttendanceStatus | null },
  { id: '3', name: 'Rahul Kumar', roll: '03', status: null as AttendanceStatus | null },
  { id: '4', name: 'Ananya Reddy', roll: '04', status: null as AttendanceStatus | null },
  { id: '5', name: 'Vikram Singh', roll: '05', status: null as AttendanceStatus | null },
  { id: '6', name: 'Meera Nair', roll: '06', status: null as AttendanceStatus | null },
  { id: '7', name: 'Arjun Das', roll: '07', status: null as AttendanceStatus | null },
  { id: '8', name: 'Kavitha Iyer', roll: '08', status: null as AttendanceStatus | null },
  { id: '9', name: 'Deepak Yadav', roll: '09', status: null as AttendanceStatus | null },
  { id: '10', name: 'Sneha Gupta', roll: '10', status: null as AttendanceStatus | null },
];

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState(students);
  const [selectedClass, setSelectedClass] = useState('5A');

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const markStatus = (id: string, status: AttendanceStatus) => {
    setAttendance((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };

  const marked = attendance.filter((s) => s.status !== null).length;
  const present = attendance.filter((s) => s.status === AttendanceStatus.PRESENT).length;
  const absent = attendance.filter((s) => s.status === AttendanceStatus.ABSENT).length;

  const handleSave = () => {
    if (marked < attendance.length) {
      Alert.alert('Incomplete', `${attendance.length - marked} students not marked yet.`);
      return;
    }
    Alert.alert('Success', 'Attendance saved successfully! ✅');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.date}>{today}</Text>
        <View style={styles.classSelector}>
          {['5A', '5B', '4A'].map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.classChip, selectedClass === c && styles.classChipActive]}
              onPress={() => setSelectedClass(c)}
            >
              <Text style={[styles.classChipText, selectedClass === c && styles.classChipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{marked}/{attendance.length}</Text>
          <Text style={styles.summaryLabel}>Marked</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: '#059669' }]}>{present}</Text>
          <Text style={styles.summaryLabel}>Present</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: '#EF4444' }]}>{absent}</Text>
          <Text style={styles.summaryLabel}>Absent</Text>
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.studentRow}>
            <View style={styles.studentInfo}>
              <View style={[styles.avatar, { backgroundColor: item.status === AttendanceStatus.PRESENT ? '#D1FAE5' : item.status === AttendanceStatus.ABSENT ? '#FEE2E2' : '#F1F5F9' }]}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.rollText}>Roll #{item.roll}</Text>
              </View>
            </View>
            <View style={styles.statusBtns}>
              <TouchableOpacity
                style={[styles.statusBtn, item.status === AttendanceStatus.PRESENT && styles.presentBtn]}
                onPress={() => markStatus(item.id, AttendanceStatus.PRESENT)}
              >
                <Text style={[styles.statusBtnText, item.status === AttendanceStatus.PRESENT && { color: '#fff' }]}>P</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statusBtn, item.status === AttendanceStatus.ABSENT && styles.absentBtn]}
                onPress={() => markStatus(item.id, AttendanceStatus.ABSENT)}
              >
                <Text style={[styles.statusBtnText, item.status === AttendanceStatus.ABSENT && { color: '#fff' }]}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statusBtn, item.status === AttendanceStatus.LATE && styles.lateBtn]}
                onPress={() => markStatus(item.id, AttendanceStatus.LATE)}
              >
                <Text style={[styles.statusBtnText, item.status === AttendanceStatus.LATE && { color: '#fff' }]}>L</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.saveText}>Save Attendance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16 },
  date: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 10 },
  classSelector: { flexDirection: 'row', gap: 8 },
  classChip: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0',
  },
  classChipActive: { backgroundColor: '#059669', borderColor: '#059669' },
  classChipText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  classChipTextActive: { color: '#fff' },
  summaryRow: {
    flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#fff',
    borderRadius: 14, padding: 14, marginBottom: 12, justifyContent: 'space-around',
  },
  summaryItem: { alignItems: 'center' },
  summaryNum: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  summaryLabel: { fontSize: 11, color: '#64748B', marginTop: 2 },
  studentRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 16, padding: 12, backgroundColor: '#fff',
    borderRadius: 12, marginBottom: 6,
  },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#334155' },
  studentName: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  rollText: { fontSize: 11, color: '#64748B' },
  statusBtns: { flexDirection: 'row', gap: 6 },
  statusBtn: {
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0',
  },
  presentBtn: { backgroundColor: '#059669', borderColor: '#059669' },
  absentBtn: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  lateBtn: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
  statusBtnText: { fontSize: 13, fontWeight: 'bold', color: '#64748B' },
  saveBtn: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#059669', padding: 16, gap: 8,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
