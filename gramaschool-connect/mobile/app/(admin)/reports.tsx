import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const summaryData = [
  { label: 'Avg Attendance', value: '87%', icon: 'checkmark-circle' as const, color: '#059669' },
  { label: 'Homework Completion', value: '72%', icon: 'book' as const, color: '#2563EB' },
  { label: 'Active Users', value: '398', icon: 'people' as const, color: '#7C3AED' },
  { label: 'Messages Sent', value: '1.2K', icon: 'chatbubbles' as const, color: '#D97706' },
];

const schoolPerformance = [
  { name: 'GVS School', attendance: 92, homework: 85 },
  { name: 'Greenfield School', attendance: 88, homework: 78 },
  { name: 'DAV School', attendance: 85, homework: 70 },
  { name: 'ZP High School', attendance: 80, homework: 65 },
  { name: 'Kendriya Vidyalaya', attendance: 94, homework: 90 },
];

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Platform Overview</Text>
      <Text style={styles.period}>May 2026</Text>

      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        {summaryData.map((item) => (
          <View key={item.label} style={styles.summaryCard}>
            <Ionicons name={item.icon} size={22} color={item.color} />
            <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* School Performance */}
      <Text style={styles.sectionTitle}>School Performance</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>School</Text>
          <Text style={styles.tableHeaderText}>Attendance</Text>
          <Text style={styles.tableHeaderText}>Homework</Text>
        </View>
        {schoolPerformance.map((school) => (
          <View key={school.name} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{school.name}</Text>
            <View style={styles.progressCell}>
              <View style={[styles.progressBar, { width: `${school.attendance}%`, backgroundColor: '#059669' }]} />
              <Text style={styles.progressText}>{school.attendance}%</Text>
            </View>
            <View style={styles.progressCell}>
              <View style={[styles.progressBar, { width: `${school.homework}%`, backgroundColor: '#2563EB' }]} />
              <Text style={styles.progressText}>{school.homework}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Monthly Trends */}
      <Text style={styles.sectionTitle}>Monthly Trends</Text>
      <View style={styles.trendsCard}>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, i) => {
          const heights = [60, 72, 68, 80, 87];
          return (
            <View key={month} style={styles.barCol}>
              <View style={[styles.bar, { height: heights[i], backgroundColor: i === 4 ? '#7C3AED' : '#E2E8F0' }]} />
              <Text style={styles.barLabel}>{month}</Text>
            </View>
          );
        })}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', paddingHorizontal: 20, paddingTop: 16 },
  period: { fontSize: 14, color: '#64748B', paddingHorizontal: 20, marginBottom: 16 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  summaryCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 14, padding: 16,
    alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#F1F5F9',
  },
  summaryValue: { fontSize: 24, fontWeight: 'bold' },
  summaryLabel: { fontSize: 11, color: '#64748B' },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#1E293B',
    paddingHorizontal: 20, marginTop: 24, marginBottom: 12,
  },
  table: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden' },
  tableHeader: {
    flexDirection: 'row', padding: 12, backgroundColor: '#F8FAFC',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
  },
  tableHeaderText: { flex: 1, fontSize: 12, fontWeight: '600', color: '#64748B' },
  tableRow: {
    flexDirection: 'row', padding: 12, alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#F8FAFC',
  },
  tableCell: { flex: 1, fontSize: 13, color: '#1E293B' },
  progressCell: { flex: 1, position: 'relative' },
  progressBar: { height: 6, borderRadius: 3, marginBottom: 4 },
  progressText: { fontSize: 12, fontWeight: '600', color: '#334155' },
  trendsCard: {
    flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#fff',
    borderRadius: 14, padding: 20, alignItems: 'flex-end', justifyContent: 'space-around',
    height: 140,
  },
  barCol: { alignItems: 'center', gap: 8 },
  bar: { width: 28, borderRadius: 6 },
  barLabel: { fontSize: 11, color: '#64748B' },
});
