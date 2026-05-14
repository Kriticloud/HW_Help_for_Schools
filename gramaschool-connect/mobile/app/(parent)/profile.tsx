import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/auth';

export default function ParentProfile() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      if (confirm('Are you sure you want to logout?')) {
        logout();
        router.replace('/(auth)/login');
      }
    } else {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => { logout(); router.replace('/(auth)/login'); } },
      ]);
    }
  };

  const menuItems = [
    { icon: 'person-outline' as const, label: 'Edit Profile' },
    { icon: 'people-outline' as const, label: 'My Children', value: '1 child' },
    { icon: 'language-outline' as const, label: 'Language', value: 'English' },
    { icon: 'notifications-outline' as const, label: 'Notifications' },
    { icon: 'card-outline' as const, label: 'Fee Payments' },
    { icon: 'shield-outline' as const, label: 'Privacy' },
    { icon: 'help-circle-outline' as const, label: 'Help & Support' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0] || 'P'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Parent'}</Text>
        <Text style={styles.role}>👨‍👩‍👧 Parent</Text>
        <Text style={styles.phone}>{user?.phone || '+91 XXXXXXXXXX'}</Text>
      </View>

      {/* Child Info */}
      <View style={styles.childCard}>
        <View style={styles.childAvatar}>
          <Text style={styles.childAvatarText}>A</Text>
        </View>
        <View style={styles.childInfo}>
          <Text style={styles.childName}>Aarav Sharma</Text>
          <Text style={styles.childClass}>Class 5A • GVS School</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <Ionicons name={item.icon} size={22} color="#334155" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <View style={styles.menuRight}>
              {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>GramaSchool Connect v1.0.0 • Parent</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  profileCard: {
    backgroundColor: '#1E40AF', padding: 32, alignItems: 'center',
    borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: '#93C5FD',
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: 14, color: '#93C5FD', marginTop: 4 },
  phone: { fontSize: 14, color: '#BFDBFE', marginTop: 4 },
  childCard: {
    flexDirection: 'row', alignItems: 'center',
    margin: 16, backgroundColor: '#fff', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  childAvatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#DBEAFE',
    justifyContent: 'center', alignItems: 'center',
  },
  childAvatarText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' },
  childInfo: { flex: 1, marginLeft: 12 },
  childName: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  childClass: { fontSize: 12, color: '#64748B' },
  menu: { backgroundColor: '#fff', margin: 16, marginTop: 0, borderRadius: 16, overflow: 'hidden' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9', gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 16, color: '#334155' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  menuValue: { fontSize: 14, color: '#94A3B8' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, margin: 16, padding: 16, backgroundColor: '#FEF2F2', borderRadius: 12,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
  version: { textAlign: 'center', fontSize: 12, color: '#94A3B8', marginBottom: 32 },
});
