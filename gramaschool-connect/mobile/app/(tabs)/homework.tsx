import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeworkStatus } from '../../src/types';

interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: HomeworkStatus;
  className: string;
}

const mockHomework: HomeworkItem[] = [
  { id: '1', title: 'Chapter 5 Questions', subject: 'Mathematics', dueDate: '2026-05-15', status: HomeworkStatus.ASSIGNED, className: 'Class 5A' },
  { id: '2', title: 'Essay: My Village', subject: 'English', dueDate: '2026-05-16', status: HomeworkStatus.ASSIGNED, className: 'Class 5A' },
  { id: '3', title: 'Draw Indian Map', subject: 'Social Studies', dueDate: '2026-05-14', status: HomeworkStatus.SUBMITTED, className: 'Class 5A' },
  { id: '4', title: 'Science Experiment', subject: 'Science', dueDate: '2026-05-12', status: HomeworkStatus.GRADED, className: 'Class 5A' },
  { id: '5', title: 'Hindi Poem', subject: 'Hindi', dueDate: '2026-05-10', status: HomeworkStatus.OVERDUE, className: 'Class 5A' },
];

const statusConfig: Record<HomeworkStatus, { color: string; bg: string; label: string }> = {
  [HomeworkStatus.ASSIGNED]: { color: '#2563EB', bg: '#DBEAFE', label: 'Pending' },
  [HomeworkStatus.SUBMITTED]: { color: '#7C3AED', bg: '#EDE9FE', label: 'Submitted' },
  [HomeworkStatus.GRADED]: { color: '#059669', bg: '#D1FAE5', label: 'Graded' },
  [HomeworkStatus.OVERDUE]: { color: '#DC2626', bg: '#FEE2E2', label: 'Overdue' },
};

type Filter = 'all' | HomeworkStatus;

export default function HomeworkScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: HomeworkStatus.ASSIGNED, label: 'Pending' },
    { key: HomeworkStatus.SUBMITTED, label: 'Submitted' },
    { key: HomeworkStatus.GRADED, label: 'Graded' },
  ];

  const filtered = filter === 'all'
    ? mockHomework
    : mockHomework.filter((h) => h.status === filter);

  return (
    <View style={styles.container}>
      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.chip, filter === f.key && styles.chipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list}>
        {filtered.map((hw) => {
          const sc = statusConfig[hw.status];
          return (
            <TouchableOpacity key={hw.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.subjectBadge, { backgroundColor: sc.bg }]}>
                  <Text style={[styles.subjectText, { color: sc.color }]}>{hw.subject}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                  <Text style={[styles.statusText, { color: sc.color }]}>{sc.label}</Text>
                </View>
              </View>
              <Text style={styles.hwTitle}>{hw.title}</Text>
              <View style={styles.cardFooter}>
                <Ionicons name="calendar-outline" size={14} color="#64748B" />
                <Text style={styles.dueText}>Due: {hw.dueDate}</Text>
                <Text style={styles.classText}>{hw.className}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  filterRow: { maxHeight: 52, backgroundColor: '#fff' },
  filterContent: { paddingHorizontal: 16, paddingVertical: 8, gap: 8, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  chipActive: { backgroundColor: '#1E40AF' },
  chipText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  subjectBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  subjectText: { fontSize: 12, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600' },
  hwTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dueText: { fontSize: 13, color: '#64748B', marginRight: 12 },
  classText: { fontSize: 13, color: '#94A3B8' },
});
