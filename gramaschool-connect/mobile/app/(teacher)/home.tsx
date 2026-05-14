import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/auth';

const myClasses = [
  { id: '1', name: 'Class 5A', students: 32, subject: 'Mathematics' },
  { id: '2', name: 'Class 5B', students: 28, subject: 'Mathematics' },
  { id: '3', name: 'Class 4A', students: 30, subject: 'Science' },
];

const todayTasks = [
  { icon: 'book' as const, title: 'Check Math HW', sub: 'Class 5A - 28/32 submitted', color: '#2563EB', done: false },
  { icon: 'checkmark-circle' as const, title: 'Mark Attendance', sub: 'Class 5B - Not done', color: '#059669', done: false },
  { icon: 'chatbubble' as const, title: 'Reply to Parents', sub: '3 unread messages', color: '#7C3AED', done: false },
  { icon: 'document-text' as const, title: 'Submit Report', sub: 'Weekly progress - Class 4A', color: '#D97706', done: true },
];

export default function TeacherHome() {
  const { user } = useAuthStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👩‍🏫</Text>
          <Text style={styles.name}>{user?.name || 'Teacher'}</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color="#059669" />
          <View style={styles.badge}><Text style={styles.badgeText}>4</Text></View>
        </TouchableOpacity>
      </View>

      {/* My Classes */}
      <Text style={styles.sectionTitle}>My Classes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classesScroll}>
        {myClasses.map((cls) => (
          <TouchableOpacity key={cls.id} style={styles.classCard}>
            <Text style={styles.className}>{cls.name}</Text>
            <Text style={styles.classSubject}>{cls.subject}</Text>
            <View style={styles.classFooter}>
              <Ionicons name="people" size={14} color="#64748B" />
              <Text style={styles.classStudents}>{cls.students} students</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Today's Tasks */}
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      {todayTasks.map((task, i) => (
        <TouchableOpacity key={i} style={styles.taskItem}>
          <View style={[styles.taskIcon, { backgroundColor: task.color + '20' }]}>
            <Ionicons name={task.icon} size={20} color={task.color} />
          </View>
          <View style={styles.taskText}>
            <Text style={[styles.taskTitle, task.done && styles.taskDone]}>{task.title}</Text>
            <Text style={styles.taskSub}>{task.sub}</Text>
          </View>
          {task.done ? (
            <Ionicons name="checkmark-circle" size={22} color="#059669" />
          ) : (
            <Ionicons name="ellipse-outline" size={22} color="#CBD5E1" />
          )}
        </TouchableOpacity>
      ))}

      {/* Quick Stats */}
      <Text style={styles.sectionTitle}>This Week</Text>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[styles.statValue, { color: '#059669' }]}>94%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#DBEAFE' }]}>
          <Text style={[styles.statValue, { color: '#2563EB' }]}>8</Text>
          <Text style={styles.statLabel}>HW Assigned</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#EDE9FE' }]}>
          <Text style={[styles.statValue, { color: '#7C3AED' }]}>12</Text>
          <Text style={styles.statLabel}>Messages</Text>
        </View>
      </View>

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
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#1E293B',
    paddingHorizontal: 20, marginTop: 20, marginBottom: 12,
  },
  classesScroll: { paddingLeft: 16 },
  classCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginRight: 12,
    width: 150, borderWidth: 1, borderColor: '#E2E8F0',
  },
  className: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  classSubject: { fontSize: 13, color: '#64748B', marginTop: 4 },
  classFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12 },
  classStudents: { fontSize: 12, color: '#64748B' },
  taskItem: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, padding: 14, backgroundColor: '#fff',
    borderRadius: 12, marginBottom: 8,
  },
  taskIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  taskText: { flex: 1, marginLeft: 12 },
  taskTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  taskDone: { textDecorationLine: 'line-through', color: '#94A3B8' },
  taskSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10 },
  statCard: { flex: 1, borderRadius: 14, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 4 },
});
