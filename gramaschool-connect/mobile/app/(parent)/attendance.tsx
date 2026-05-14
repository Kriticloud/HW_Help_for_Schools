import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekStatus = ['present', 'present', 'absent', 'present', 'present', 'holiday'];

const monthlyData = {
  totalDays: 22,
  present: 19,
  absent: 2,
  late: 1,
  percentage: '86%',
};

const recentRecords = [
  { date: 'May 14, 2026', day: 'Thursday', status: 'present', remark: '' },
  { date: 'May 13, 2026', day: 'Wednesday', status: 'present', remark: '' },
  { date: 'May 12, 2026', day: 'Tuesday', status: 'absent', remark: 'Sick leave' },
  { date: 'May 11, 2026', day: 'Monday', status: 'present', remark: '' },
  { date: 'May 10, 2026', day: 'Saturday', status: 'present', remark: '' },
  { date: 'May 9, 2026', day: 'Friday', status: 'present', remark: '' },
  { date: 'May 8, 2026', day: 'Thursday', status: 'late', remark: 'Arrived 10 min late' },
];

export default function ParentAttendance() {
  return (
    <ScrollView style={styles.container}>
      {/* Child Header */}
      <View style={styles.childHeader}>
        <View style={styles.childAvatar}>
          <Text style={styles.childAvatarText}>A</Text>
        </View>
        <View>
          <Text style={styles.childName}>Aarav Sharma</Text>
          <Text style={styles.childClass}>Class 5A • Roll #01</Text>
        </View>
      </View>

      {/* Monthly Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>May 2026</Text>
        <View style={styles.percentCircle}>
          <Text style={styles.percentText}>{monthlyData.percentage}</Text>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <View style={[styles.dot, { backgroundColor: '#059669' }]} />
            <Text style={styles.statLabel}>Present: {monthlyData.present}</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.statLabel}>Absent: {monthlyData.absent}</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.statLabel}>Late: {monthlyData.late}</Text>
          </View>
        </View>
      </View>

      {/* This Week */}
      <Text style={styles.sectionTitle}>This Week</Text>
      <View style={styles.weekRow}>
        {weekDays.map((day, i) => (
          <View key={day} style={styles.weekDay}>
            <Text style={styles.dayLabel}>{day}</Text>
            <View style={[styles.dayCircle, {
              backgroundColor: weekStatus[i] === 'present' ? '#D1FAE5' :
                weekStatus[i] === 'absent' ? '#FEE2E2' : '#F1F5F9',
            }]}>
              {weekStatus[i] === 'present' && <Ionicons name="checkmark" size={16} color="#059669" />}
              {weekStatus[i] === 'absent' && <Ionicons name="close" size={16} color="#EF4444" />}
              {weekStatus[i] === 'holiday' && <Text style={{ fontSize: 12 }}>🏖️</Text>}
            </View>
          </View>
        ))}
      </View>

      {/* Recent Records */}
      <Text style={styles.sectionTitle}>Recent Records</Text>
      {recentRecords.map((record, i) => (
        <View key={i} style={styles.recordItem}>
          <View style={[styles.recordDot, {
            backgroundColor: record.status === 'present' ? '#059669' :
              record.status === 'absent' ? '#EF4444' : '#F59E0B',
          }]} />
          <View style={styles.recordInfo}>
            <Text style={styles.recordDate}>{record.date} ({record.day})</Text>
            {record.remark ? <Text style={styles.recordRemark}>{record.remark}</Text> : null}
          </View>
          <Text style={[styles.recordStatus, {
            color: record.status === 'present' ? '#059669' :
              record.status === 'absent' ? '#EF4444' : '#F59E0B',
          }]}>{record.status}</Text>
        </View>
      ))}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  childHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  childAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#1E40AF',
    justifyContent: 'center', alignItems: 'center',
  },
  childAvatarText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  childName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  childClass: { fontSize: 13, color: '#64748B' },
  summaryCard: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 20,
    alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9',
  },
  summaryTitle: { fontSize: 14, fontWeight: '600', color: '#64748B', marginBottom: 12 },
  percentCircle: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: '#1E40AF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  percentText: { fontSize: 22, fontWeight: 'bold', color: '#1E40AF' },
  summaryStats: { flexDirection: 'row', gap: 16 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statLabel: { fontSize: 12, color: '#64748B' },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#1E293B',
    paddingHorizontal: 20, marginTop: 20, marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#fff',
    borderRadius: 14, padding: 14, justifyContent: 'space-around',
  },
  weekDay: { alignItems: 'center', gap: 6 },
  dayLabel: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  dayCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  recordItem: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, padding: 12, backgroundColor: '#fff',
    borderRadius: 10, marginBottom: 6,
  },
  recordDot: { width: 10, height: 10, borderRadius: 5 },
  recordInfo: { flex: 1, marginLeft: 12 },
  recordDate: { fontSize: 13, fontWeight: '500', color: '#1E293B' },
  recordRemark: { fontSize: 11, color: '#64748B', marginTop: 2 },
  recordStatus: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
});
