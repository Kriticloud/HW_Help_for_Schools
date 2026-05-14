import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface QuickAction {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  bg: string;
  route: string;
}

const quickActions: QuickAction[] = [
  { icon: 'book', label: 'Homework', color: '#2563EB', bg: '#DBEAFE', route: '/(tabs)/homework' },
  { icon: 'checkmark-circle', label: 'Attendance', color: '#059669', bg: '#D1FAE5', route: '/(tabs)/attendance' },
  { icon: 'chatbubbles', label: 'Messages', color: '#7C3AED', bg: '#EDE9FE', route: '/(tabs)/messages' },
  { icon: 'notifications', label: 'Notices', color: '#DC2626', bg: '#FEE2E2', route: '/(tabs)/messages' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome */}
      <View style={styles.welcome}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.name}>Welcome back!</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1E40AF" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[styles.actionCard, { backgroundColor: action.bg }]}
            onPress={() => router.push(action.route as any)}
          >
            <Ionicons name={action.icon} size={28} color={action.color} />
            <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Today's Summary */}
      <Text style={styles.sectionTitle}>Today's Summary</Text>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#EFF6FF' }]}>
          <Text style={styles.summaryNum}>5</Text>
          <Text style={styles.summaryLabel}>Homework Due</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#F0FDF4' }]}>
          <Text style={styles.summaryNum}>92%</Text>
          <Text style={styles.summaryLabel}>Attendance</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {[
        { icon: 'book' as const, title: 'Math Homework', sub: 'Due tomorrow', color: '#2563EB' },
        { icon: 'checkmark-circle' as const, title: 'Attendance Marked', sub: 'Class 5A - Today', color: '#059669' },
        { icon: 'chatbubble' as const, title: 'New Message', sub: 'From Mrs. Sharma', color: '#7C3AED' },
      ].map((item, i) => (
        <View key={i} style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <View style={styles.activityText}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.activitySub}>{item.sub}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </View>
      ))}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  welcome: {
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
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    width: '47%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  actionLabel: { fontSize: 14, fontWeight: '600' },
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  summaryNum: { fontSize: 28, fontWeight: 'bold', color: '#1E293B' },
  summaryLabel: { fontSize: 13, color: '#64748B', marginTop: 4 },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityText: { flex: 1 },
  activityTitle: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  activitySub: { fontSize: 13, color: '#64748B', marginTop: 2 },
});
