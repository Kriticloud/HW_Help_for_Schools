import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/auth';

export default function TeacherProfile() {
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
    { icon: 'school-outline' as const, label: 'My Classes' },
    { icon: 'language-outline' as const, label: 'Language', value: 'English' },
    { icon: 'notifications-outline' as const, label: 'Notifications' },
    { icon: 'document-text-outline' as const, label: 'My Reports' },
    { icon: 'help-circle-outline' as const, label: 'Help & Support' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0] || 'T'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Teacher'}</Text>
        <Text style={styles.role}>👩‍🏫 Teacher</Text>
        <Text style={styles.phone}>{user?.phone || '+91 XXXXXXXXXX'}</Text>
        <View style={styles.statsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNum}>3</Text>
            <Text style={styles.profileStatLabel}>Classes</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNum}>90</Text>
            <Text style={styles.profileStatLabel}>Students</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNum}>4.8</Text>
            <Text style={styles.profileStatLabel}>Rating</Text>
          </View>
        </View>
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

      <Text style={styles.version}>GramaSchool Connect v1.0.0 • Teacher</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  profileCard: {
    backgroundColor: '#059669', padding: 32, alignItems: 'center',
    borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#34D399', justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: '#6EE7B7',
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: 14, color: '#A7F3D0', marginTop: 4 },
  phone: { fontSize: 14, color: '#D1FAE5', marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: 16, gap: 24 },
  profileStat: { alignItems: 'center' },
  profileStatNum: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  profileStatLabel: { fontSize: 11, color: '#A7F3D0', marginTop: 2 },
  menu: { backgroundColor: '#fff', margin: 16, borderRadius: 16, overflow: 'hidden' },
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
