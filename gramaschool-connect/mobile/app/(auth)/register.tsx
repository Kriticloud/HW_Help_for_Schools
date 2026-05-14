import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { UserRole } from '../../src/types';
import { useAuthStore } from '../../src/store/auth';

export default function RegisterScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PARENT);
  const loginWithRole = useAuthStore((s) => s.loginWithRole);

  const roles = [
    { key: UserRole.ADMIN, label: 'Admin', icon: '🛡️' },
    { key: UserRole.TEACHER, label: 'Teacher', icon: '👩‍🏫' },
    { key: UserRole.PARENT, label: 'Parent', icon: '👨‍👩‍👧' },
  ];

  const handleRegister = async () => {
    if (name.trim()) {
      await loginWithRole(name.trim(), phone || '9876543210', role);
      if (role === UserRole.ADMIN) {
        router.replace('/(admin)/dashboard');
      } else if (role === UserRole.TEACHER) {
        router.replace('/(teacher)/home');
      } else {
        router.replace('/(parent)/home');
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Complete Profile</Text>
      <Text style={styles.subtitle}>Tell us about yourself</Text>

      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#94A3B8"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>I am a</Text>
      <View style={styles.roleRow}>
        {roles.map((r) => (
          <TouchableOpacity
            key={r.key}
            style={[styles.roleCard, role === r.key && styles.roleActive]}
            onPress={() => setRole(r.key)}
          >
            <Text style={styles.roleIcon}>{r.icon}</Text>
            <Text style={[styles.roleLabel, role === r.key && styles.roleLabelActive]}>
              {r.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !name.trim() && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={!name.trim()}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 24,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleActive: {
    borderColor: '#1E40AF',
    backgroundColor: '#EFF6FF',
  },
  roleIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  roleLabelActive: {
    color: '#1E40AF',
  },
  button: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
