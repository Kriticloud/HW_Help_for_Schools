import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      router.push({ pathname: '/(auth)/otp', params: { phone } });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>📚</Text>
        <Text style={styles.title}>GramaSchool</Text>
        <Text style={styles.subtitle}>Connect</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Enter your phone number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, phone.length < 10 && styles.buttonDisabled]}
          onPress={handleSendOtp}
          disabled={phone.length < 10}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          By continuing, you agree to our Terms of Service
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E40AF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    color: '#93C5FD',
    marginTop: 4,
  },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    paddingBottom: 48,
  },
  label: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
    fontWeight: '600',
  },
  phoneRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  countryCode: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginRight: 8,
  },
  countryText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#1E293B',
    height: 52,
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
  footer: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});
