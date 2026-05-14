import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/auth';

export default function AdminProfileScreen() {
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
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          },
        },
      ]);
    }
  };

  const menuItems = [
    { icon: 'settings-outline' as const, label: 'System Settings', onPress: () => {} },
    { icon: 'key-outline' as const, label: 'Access Control', onPress: () => {} },
    { icon: 'cloud-download-outline' as const, label: 'Backup & Export', onPress: () => {} },
    { icon: 'notifications-outline' as const, label: 'Notifications', onPress: () => {} },
    { icon: 'shield-checkmark-outline' as const, label: 'Security', onPress: () => {} },
    { icon: 'help-circle-outline' as const, label: 'Help & Support', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0] || 'A'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Admin'}</Text>
        <Text style={styles.role}>🛡️ System Administrator</Text>
        <Text style={styles.phone}>{user?.phone || '+91 XXXXXXXXXX'}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon} size={22} color="#334155" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>GramaSchool Connect v1.0.0 • Admin</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  profileCard: {
    backgroundColor: '#7C3AED', padding: 32, alignItems: 'center',
    borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#A78BFA', justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: '#C4B5FD',
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: 14, color: '#C4B5FD', marginTop: 4 },
  phone: { fontSize: 14, color: '#DDD6FE', marginTop: 4 },
  menu: {
    backgroundColor: '#fff', margin: 16, borderRadius: 16, overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9', gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 16, color: '#334155' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, margin: 16, padding: 16, backgroundColor: '#FEF2F2', borderRadius: 12,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
  version: { textAlign: 'center', fontSize: 12, color: '#94A3B8', marginBottom: 32 },
});
