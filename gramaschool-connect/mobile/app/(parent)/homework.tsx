import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const homework = [
  { id: '1', title: 'Chapter 5 - Algebra Questions', subject: 'Mathematics', teacher: 'Mrs. Sharma', dueDate: '2026-05-16', status: 'pending' },
  { id: '2', title: 'Essay: My Village', subject: 'English', teacher: 'Mr. Reddy', dueDate: '2026-05-17', status: 'pending' },
  { id: '3', title: 'Draw Indian Map', subject: 'Social Studies', teacher: 'Mrs. Kumar', dueDate: '2026-05-14', status: 'submitted' },
  { id: '4', title: 'Science Experiment Report', subject: 'Science', teacher: 'Mr. Singh', dueDate: '2026-05-12', status: 'graded', grade: '95%' },
  { id: '5', title: 'Hindi Poem - Memorize', subject: 'Hindi', teacher: 'Mrs. Devi', dueDate: '2026-05-10', status: 'graded', grade: '88%' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#FEF3C7', text: '#D97706' },
  submitted: { bg: '#DBEAFE', text: '#2563EB' },
  graded: { bg: '#D1FAE5', text: '#059669' },
};

export default function ParentHomework() {
  const pending = homework.filter((h) => h.status === 'pending').length;

  return (
    <View style={styles.container}>
      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[styles.summaryNum, { color: '#D97706' }]}>{pending}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#DBEAFE' }]}>
          <Text style={[styles.summaryNum, { color: '#2563EB' }]}>
            {homework.filter((h) => h.status === 'submitted').length}
          </Text>
          <Text style={styles.summaryLabel}>Submitted</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[styles.summaryNum, { color: '#059669' }]}>
            {homework.filter((h) => h.status === 'graded').length}
          </Text>
          <Text style={styles.summaryLabel}>Graded</Text>
        </View>
      </View>

      {/* Child Name */}
      <View style={styles.childRow}>
        <View style={styles.childBadge}>
          <Text style={styles.childBadgeText}>A</Text>
        </View>
        <Text style={styles.childName}>Aarav's Homework</Text>
      </View>

      {/* Homework List */}
      <FlatList
        data={homework}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.subject}>{item.subject}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status].bg }]}>
                <Text style={[styles.statusText, { color: statusColors[item.status].text }]}>
                  {item.status === 'graded' ? `✓ ${item.grade}` : item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.cardBottom}>
              <Text style={styles.teacher}>👩‍🏫 {item.teacher}</Text>
              <Text style={styles.dueDate}>📅 {item.dueDate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  summaryRow: { flexDirection: 'row', padding: 16, gap: 10 },
  summaryCard: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
  summaryNum: { fontSize: 22, fontWeight: 'bold' },
  summaryLabel: { fontSize: 11, color: '#64748B', marginTop: 2 },
  childRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, gap: 8 },
  childBadge: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#1E40AF',
    justifyContent: 'center', alignItems: 'center',
  },
  childBadgeText: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  childName: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  card: {
    marginHorizontal: 16, marginBottom: 10, backgroundColor: '#fff',
    borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#F1F5F9',
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  subject: { fontSize: 13, fontWeight: '600', color: '#7C3AED' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  teacher: { fontSize: 12, color: '#64748B' },
  dueDate: { fontSize: 12, color: '#64748B' },
});
