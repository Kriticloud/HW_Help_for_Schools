import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockHomework = [
  { id: '1', title: 'Chapter 5 - Algebra Questions', subject: 'Mathematics', class: '5A', dueDate: '2026-05-16', submitted: 28, total: 32, status: 'active' },
  { id: '2', title: 'Essay: My Village', subject: 'English', class: '5A', dueDate: '2026-05-17', submitted: 20, total: 32, status: 'active' },
  { id: '3', title: 'Science Experiment Report', subject: 'Science', class: '4A', dueDate: '2026-05-15', submitted: 30, total: 30, status: 'completed' },
  { id: '4', title: 'Draw Indian Map', subject: 'Social Studies', class: '5B', dueDate: '2026-05-14', submitted: 25, total: 28, status: 'active' },
  { id: '5', title: 'Hindi Poetry - Memorize', subject: 'Hindi', class: '5A', dueDate: '2026-05-18', submitted: 0, total: 32, status: 'active' },
];

export default function TeacherHomework() {
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newClass, setNewClass] = useState('5A');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>My Assignments</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => setShowCreate(true)}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Homework List */}
      <FlatList
        data={mockHomework}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTop}>
              <View style={[styles.subjectBadge, {
                backgroundColor: item.subject === 'Mathematics' ? '#DBEAFE' : item.subject === 'English' ? '#FEF3C7' :
                  item.subject === 'Science' ? '#D1FAE5' : '#EDE9FE',
              }]}>
                <Text style={[styles.subjectText, {
                  color: item.subject === 'Mathematics' ? '#2563EB' : item.subject === 'English' ? '#D97706' :
                    item.subject === 'Science' ? '#059669' : '#7C3AED',
                }]}>{item.subject}</Text>
              </View>
              <Text style={styles.classLabel}>Class {item.class}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.cardBottom}>
              <Text style={styles.dueDate}>📅 Due: {item.dueDate}</Text>
              <View style={styles.progressRow}>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${(item.submitted / item.total) * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{item.submitted}/{item.total}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Create Modal */}
      <Modal visible={showCreate} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Homework</Text>
              <TouchableOpacity onPress={() => setShowCreate(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.input} placeholder="Enter homework title" value={newTitle} onChangeText={setNewTitle} />
            <Text style={styles.inputLabel}>Subject</Text>
            <TextInput style={styles.input} placeholder="e.g. Mathematics" value={newSubject} onChangeText={setNewSubject} />
            <Text style={styles.inputLabel}>Class</Text>
            <View style={styles.classRow}>
              {['5A', '5B', '4A'].map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.classChip, newClass === c && styles.classChipActive]}
                  onPress={() => setNewClass(c)}
                >
                  <Text style={[styles.classChipText, newClass === c && styles.classChipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={() => setShowCreate(false)}>
              <Text style={styles.submitText}>Assign Homework</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  createBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#059669', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
  },
  createText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  card: {
    marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff',
    borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#F1F5F9',
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subjectBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  subjectText: { fontSize: 12, fontWeight: '600' },
  classLabel: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 10 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dueDate: { fontSize: 12, color: '#64748B' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressBg: { width: 60, height: 6, borderRadius: 3, backgroundColor: '#E2E8F0' },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: '#059669' },
  progressText: { fontSize: 12, fontWeight: '600', color: '#334155' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#F1F5F9', borderRadius: 10, padding: 12, fontSize: 15, color: '#1E293B',
  },
  classRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  classChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0',
  },
  classChipActive: { backgroundColor: '#059669', borderColor: '#059669' },
  classChipText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  classChipTextActive: { color: '#fff' },
  submitBtn: {
    backgroundColor: '#059669', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
