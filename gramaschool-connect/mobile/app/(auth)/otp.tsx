import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      router.replace({ pathname: '/(auth)/register', params: { phone } });
    } else {
      Alert.alert('Error', 'Please enter the complete OTP');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          We sent a code to +91 {phone}
        </Text>
        <View style={styles.mockOtp}>
          <Text style={styles.mockOtpLabel}>🔑 Demo OTP:</Text>
          <Text style={styles.mockOtpCode}>123456</Text>
        </View>
      </View>

      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => { inputs.current[i] = ref; }}
            style={[styles.otpInput, digit ? styles.otpFilled : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(t) => handleChange(t, i)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resend}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  back: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '600',
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
  },
  mockOtp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  mockOtpLabel: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '600',
  },
  mockOtpCode: {
    fontSize: 20,
    color: '#92400E',
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 4,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  otpFilled: {
    borderColor: '#1E40AF',
    backgroundColor: '#EFF6FF',
  },
  button: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resend: {
    alignItems: 'center',
  },
  resendText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
  },
});
