import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/auth';

const stats = [
  { label: 'Total Schools', value: '12', icon: 'business' as const, color: '#2563EB', bg: '#DBEAFE' },
  { label: 'Teachers', value: '48', icon: 'school' as const, color: '#059669', bg: '#D1FAE5' },
  { label: 'Parents', value: '350', icon: 'people' as const, color: '#D97706', bg: '#FEF3C7' },
  { label: 'Students', value: '520', icon: 'person' as const, color: '#7C3AED', bg: '#EDE9FE' },
];

const recentActions = [
  { icon: 'person-add' as const, title: 'New Teacher Registered', sub: 'Ravi Kumar - GVS School', time: '2m ago', color: '#059669' },
  { icon: 'school' as const, title: 'School Approved', sub: 'Greenfield Public School', time: '1h ago', color: '#2563EB' },
  { icon: 'alert-circle' as const, title: 'Low Attendance Alert', sub: 'Class 4B - Only 60%', time: '3h ago', color: '#EF4444' },
  { icon: 'document-text' as const, title: 'Report Generated', sub: 'Monthly Summary - April', time: '5h ago', color: '#7C3AED' },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Panel 🛡️</Text>
          <Text style={styles.name}>Welcome, {user?.name || 'Admin'}</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color="#7C3AED" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={[styles.statCard, { backgroundColor: stat.bg }]}>
            <Ionicons name={stat.icon} size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#7C3AED' }]}>
          <Ionicons name="person-add" size={20} color="#fff" />
          <Text style={styles.actionBtnText}>Add User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#2563EB' }]}>
          <Ionicons name="business" size={20} color="#fff" />
          <Text style={styles.actionBtnText}>Add School</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#059669' }]}>
          <Ionicons name="analytics" size={20} color="#fff" />
          <Text style={styles.actionBtnText}>Reports</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {recentActions.map((item, i) => (
        <View key={i} style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <View style={styles.activityText}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.activitySub}>{item.sub}</Text>
          </View>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      ))}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 12,
  },
  greeting: { fontSize: 14, color: '#64748B' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', marginTop: 2 },
  notifBtn: { position: 'relative', padding: 8 },
  badge: {
    position: 'absolute', top: 4, right: 4,
    backgroundColor: '#EF4444', borderRadius: 10,
    width: 18, height: 18, justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 12,
  },
  statCard: {
    width: '47%', borderRadius: 16, padding: 16, alignItems: 'center', gap: 4,
  },
  statValue: { fontSize: 28, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#64748B' },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#1E293B',
    paddingHorizontal: 20, marginTop: 24, marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row', paddingHorizontal: 16, gap: 10,
  },
  actionBtn: {
    flex: 1, borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  activityItem: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, padding: 14, backgroundColor: '#fff',
    borderRadius: 12, marginBottom: 8,
  },
  activityIcon: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  activityText: { flex: 1, marginLeft: 12 },
  activityTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  activitySub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  activityTime: { fontSize: 11, color: '#94A3B8' },
});
