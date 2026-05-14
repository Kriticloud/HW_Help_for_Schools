import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

const getToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') return localStorage.getItem('accessToken');
  const SecureStore = require('expo-secure-store');
  return SecureStore.getItemAsync('accessToken');
};

const removeToken = async (): Promise<void> => {
  if (Platform.OS === 'web') { localStorage.removeItem('accessToken'); return; }
  const SecureStore = require('expo-secure-store');
  await SecureStore.deleteItemAsync('accessToken');
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
    }
    return Promise.reject(error);
  },
);

export default api;
