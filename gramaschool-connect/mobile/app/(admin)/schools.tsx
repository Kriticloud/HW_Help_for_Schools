import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockSchools = [
  { id: '1', name: 'Government Vidya School', district: 'Hyderabad', teachers: 8, students: 120, status: 'active' },
  { id: '2', name: 'Greenfield Public School', district: 'Warangal', teachers: 12, students: 180, status: 'active' },
  { id: '3', name: 'DAV Model School', district: 'Karimnagar', teachers: 6, students: 85, status: 'active' },
  { id: '4', name: 'Sri Saraswathi Vidyalaya', district: 'Nizamabad', teachers: 10, students: 150, status: 'pending' },
  { id: '5', name: 'ZP High School', district: 'Adilabad', teachers: 5, students: 65, status: 'active' },
  { id: '6', name: 'Kendriya Vidyalaya', district: 'Secunderabad', teachers: 15, students: 250, status: 'active' },
];

export default function SchoolsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.totalText}>{mockSchools.length} Schools</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={20} color="#7C3AED" />
          <Text style={styles.addText}>Add School</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockSchools}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="business" size={22} color="#7C3AED" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.schoolName}>{item.name}</Text>
                <Text style={styles.district}>📍 {item.district}</Text>
              </View>
              <View style={[styles.statusBadge, {
                backgroundColor: item.status === 'active' ? '#D1FAE5' : '#FEF3C7',
              }]}>
                <Text style={[styles.statusText, {
                  color: item.status === 'active' ? '#059669' : '#D97706',
                }]}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="school-outline" size={16} color="#64748B" />
                <Text style={styles.statText}>{item.teachers} Teachers</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={16} color="#64748B" />
                <Text style={styles.statText}>{item.students} Students</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
  },
  totalText: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addText: { fontSize: 14, fontWeight: '600', color: '#7C3AED' },
  card: {
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: '#F1F5F9',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#EDE9FE', justifyContent: 'center', alignItems: 'center',
  },
  cardInfo: { flex: 1, marginLeft: 12 },
  schoolName: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  district: { fontSize: 12, color: '#64748B', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  statsRow: {
    flexDirection: 'row', marginTop: 12, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: '#F1F5F9', gap: 20,
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { fontSize: 13, color: '#64748B' },
});
