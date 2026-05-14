import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type UserType = 'all' | 'teacher' | 'parent';

const mockUsers = [
  { id: '1', name: 'Ravi Kumar', role: 'teacher', phone: '+91 9876543210', school: 'GVS School', status: 'active' },
  { id: '2', name: 'Sunita Devi', role: 'parent', phone: '+91 9876543211', school: 'GVS School', status: 'active' },
  { id: '3', name: 'Pradeep Singh', role: 'teacher', phone: '+91 9876543212', school: 'Greenfield School', status: 'active' },
  { id: '4', name: 'Meena Kumari', role: 'parent', phone: '+91 9876543213', school: 'GVS School', status: 'inactive' },
  { id: '5', name: 'Amit Sharma', role: 'teacher', phone: '+91 9876543214', school: 'DAV School', status: 'active' },
  { id: '6', name: 'Kavitha Reddy', role: 'parent', phone: '+91 9876543215', school: 'Greenfield School', status: 'active' },
  { id: '7', name: 'Rajesh Yadav', role: 'teacher', phone: '+91 9876543216', school: 'Model School', status: 'pending' },
  { id: '8', name: 'Lakshmi Nair', role: 'parent', phone: '+91 9876543217', school: 'DAV School', status: 'active' },
];

export default function UsersScreen() {
  const [filter, setFilter] = useState<UserType>('all');
  const [search, setSearch] = useState('');

  const filtered = mockUsers.filter((u) => {
    if (filter !== 'all' && u.role !== filter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {(['all', 'teacher', 'parent'] as UserType[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.chipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>
              {f === 'all' ? 'All' : f === 'teacher' ? '👩‍🏫 Teachers' : '👨‍👩‍👧 Parents'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard}>
            <View style={[styles.avatar, { backgroundColor: item.role === 'teacher' ? '#DBEAFE' : '#D1FAE5' }]}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userMeta}>{item.phone} • {item.school}</Text>
            </View>
            <View style={styles.userRight}>
              <View style={[styles.statusDot, {
                backgroundColor: item.status === 'active' ? '#10B981' : item.status === 'pending' ? '#F59E0B' : '#EF4444'
              }]} />
              <Text style={[styles.roleBadge, {
                backgroundColor: item.role === 'teacher' ? '#DBEAFE' : '#D1FAE5',
                color: item.role === 'teacher' ? '#2563EB' : '#059669',
              }]}>{item.role}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchRow: { flexDirection: 'row', padding: 16, gap: 10 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, height: 44,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#1E293B' },
  addBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#7C3AED', justifyContent: 'center', alignItems: 'center',
  },
  filters: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  chipActive: { backgroundColor: '#7C3AED', borderColor: '#7C3AED' },
  chipText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginBottom: 8, padding: 14,
    backgroundColor: '#fff', borderRadius: 12,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#334155' },
  userInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  userMeta: { fontSize: 12, color: '#64748B', marginTop: 2 },
  userRight: { alignItems: 'flex-end', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  roleBadge: {
    fontSize: 11, fontWeight: '600', paddingHorizontal: 8,
    paddingVertical: 2, borderRadius: 8, overflow: 'hidden', textTransform: 'capitalize',
  },
});
