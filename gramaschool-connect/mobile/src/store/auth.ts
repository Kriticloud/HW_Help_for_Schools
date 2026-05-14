import { create } from 'zustand';
import { Platform } from 'react-native';
import { User, UserRole, Language } from '../types';

// Web-safe storage wrapper (SecureStore doesn't work on web)
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    const SecureStore = require('expo-secure-store');
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    const SecureStore = require('expo-secure-store');
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    const SecureStore = require('expo-secure-store');
    await SecureStore.deleteItemAsync(key);
  },
};

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setAuth: (token: string, user: User) => Promise<void>;
  loginWithRole: (name: string, phone: string, role: UserRole) => Promise<void>;
  loadToken: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setAuth: async (token: string, user: User) => {
    await storage.setItem('accessToken', token);
    await storage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  loginWithRole: async (name: string, phone: string, role: UserRole) => {
    const user: User = {
      id: `user_${Date.now()}`,
      name,
      phone: `+91 ${phone}`,
      role,
      preferredLanguage: Language.ENGLISH,
      isActive: true,
      createdAt: new Date().toISOString(),
      schoolId: 'school_001',
    };
    const token = `mock_token_${role}_${Date.now()}`;
    await storage.setItem('accessToken', token);
    await storage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  loadToken: async () => {
    try {
      const token = await storage.getItem('accessToken');
      const userStr = await storage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr) as User;
        set({ token, user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      await storage.removeItem('accessToken');
      await storage.removeItem('user');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    await storage.removeItem('accessToken');
    await storage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
