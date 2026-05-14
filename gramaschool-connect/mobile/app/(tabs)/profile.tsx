import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/auth';
import { Language } from '../../src/types';

const languages = [
  { key: Language.ENGLISH, label: 'English' },
  { key: Language.HINDI, label: 'हिन्दी' },
  { key: Language.TELUGU, label: 'తెలుగు' },
  { key: Language.TAMIL, label: 'தமிழ்' },
  { key: Language.KANNADA, label: 'ಕನ್ನಡ' },
  { key: Language.MALAYALAM, label: 'മലയാളം' },
  { key: Language.MARATHI, label: 'मराठी' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
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
  };

  const menuItems = [
    { icon: 'person-outline' as const, label: 'Edit Profile', onPress: () => {} },
    { icon: 'language-outline' as const, label: 'Language', value: 'English', onPress: () => {} },
    { icon: 'notifications-outline' as const, label: 'Notifications', onPress: () => {} },
    { icon: 'shield-outline' as const, label: 'Privacy', onPress: () => {} },
    { icon: 'help-circle-outline' as const, label: 'Help & Support', onPress: () => {} },
    { icon: 'information-circle-outline' as const, label: 'About', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.[0] || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.role}>{user?.role || 'Parent'}</Text>
        <Text style={styles.phone}>{user?.phone || '+91 XXXXXXXXXX'}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon} size={22} color="#334155" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <View style={styles.menuRight}>
              {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>GramaSchool Connect v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  profileCard: {
    backgroundColor: '#1E40AF',
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#93C5FD',
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: 14, color: '#93C5FD', marginTop: 4, textTransform: 'capitalize' },
  phone: { fontSize: 14, color: '#BFDBFE', marginTop: 4 },
  menu: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 16, color: '#334155' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  menuValue: { fontSize: 14, color: '#94A3B8' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 16,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 32,
  },
});
