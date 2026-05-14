import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../src/store/auth';
import { UserRole } from '../src/types';

export default function Index() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E40AF' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isAuthenticated && user) {
    switch (user.role) {
      case UserRole.ADMIN:
        return <Redirect href="/(admin)/dashboard" />;
      case UserRole.TEACHER:
        return <Redirect href="/(teacher)/home" />;
      case UserRole.PARENT:
      default:
        return <Redirect href="/(parent)/home" />;
    }
  }

  return <Redirect href="/(auth)/login" />;
}
