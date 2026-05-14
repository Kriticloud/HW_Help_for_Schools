import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/auth';

const children = [
  { id: '1', name: 'Aarav', class: '5A', attendance: '94%', pendingHW: 2 },
];

export default function ParentHome() {
  const { user } = useAuthStore();
  const child = children[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.name}>{user?.name || 'Parent'}</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1E40AF" />
          <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
        </TouchableOpacity>
      </View>

      {/* Child Card */}
      <View style={styles.childCard}>
        <View style={styles.childAvatar}>
          <Text style={styles.childAvatarText}>{child.name[0]}</Text>
        </View>
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.childClass}>Class {child.class} • Roll #01</Text>
        </View>
        <View style={styles.childStats}>
          <Text style={styles.childStatValue}>{child.attendance}</Text>
          <Text style={styles.childStatLabel}>Attendance</Text>
        </View>
      </View>

      {/* Quick Summary */}
      <Text style={styles.sectionTitle}>Today's Overview</Text>
      <View style={styles.overviewGrid}>
        <View style={[styles.overviewCard, { backgroundColor: '#DBEAFE' }]}>
          <Ionicons name="book" size={24} color="#2563EB" />
          <Text style={[styles.overviewValue, { color: '#2563EB' }]}>{child.pendingHW}</Text>
          <Text style={styles.overviewLabel}>Pending HW</Text>
        </View>
        <View style={[styles.overviewCard, { backgroundColor: '#D1FAE5' }]}>
          <Ionicons name="checkmark-circle" size={24} color="#059669" />
          <Text style={[styles.overviewValue, { color: '#059669' }]}>✓</Text>
          <Text style={styles.overviewLabel}>Present Today</Text>
        </View>
        <View style={[styles.overviewCard, { backgroundColor: '#FEF3C7' }]}>
          <Ionicons name="calendar" size={24} color="#D97706" />
          <Text style={[styles.overviewValue, { color: '#D97706' }]}>3</Text>
          <Text style={styles.overviewLabel}>Exams This Week</Text>
        </View>
        <View style={[styles.overviewCard, { backgroundColor: '#EDE9FE' }]}>
          <Ionicons name="chatbubble" size={24} color="#7C3AED" />
          <Text style={[styles.overviewValue, { color: '#7C3AED' }]}>1</Text>
          <Text style={styles.overviewLabel}>New Messages</Text>
        </View>
      </View>

      {/* Notices */}
      <Text style={styles.sectionTitle}>School Notices</Text>
      {[
        { title: 'Holiday - Republic Day', date: 'May 15, 2026', icon: 'flag' as const, color: '#D97706' },
        { title: 'PTA Meeting', date: 'May 20, 2026', icon: 'people' as const, color: '#7C3AED' },
        { title: 'Annual Day Rehearsal', date: 'May 22, 2026', icon: 'musical-notes' as const, color: '#2563EB' },
      ].map((notice, i) => (
        <View key={i} style={styles.noticeItem}>
          <View style={[styles.noticeIcon, { backgroundColor: notice.color + '20' }]}>
            <Ionicons name={notice.icon} size={18} color={notice.color} />
          </View>
          <View style={styles.noticeText}>
            <Text style={styles.noticeTitle}>{notice.title}</Text>
            <Text style={styles.noticeDate}>{notice.date}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </View>
      ))}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, paddingTop: 12,
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
  childCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, backgroundColor: '#1E40AF', borderRadius: 16, padding: 16,
  },
  childAvatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#3B82F6',
    justifyContent: 'center', alignItems: 'center',
  },
  childAvatarText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  childInfo: { flex: 1, marginLeft: 12 },
  childName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  childClass: { fontSize: 13, color: '#93C5FD', marginTop: 2 },
  childStats: { alignItems: 'center' },
  childStatValue: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  childStatLabel: { fontSize: 10, color: '#93C5FD' },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#1E293B',
    paddingHorizontal: 20, marginTop: 20, marginBottom: 12,
  },
  overviewGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  overviewCard: {
    width: '47%', borderRadius: 14, padding: 16, alignItems: 'center', gap: 4,
  },
  overviewValue: { fontSize: 22, fontWeight: 'bold' },
  overviewLabel: { fontSize: 11, color: '#64748B' },
  noticeItem: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, padding: 14, backgroundColor: '#fff',
    borderRadius: 12, marginBottom: 8,
  },
  noticeIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  noticeText: { flex: 1, marginLeft: 12 },
  noticeTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  noticeDate: { fontSize: 12, color: '#64748B', marginTop: 2 },
});
