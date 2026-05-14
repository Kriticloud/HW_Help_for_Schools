import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/auth';

const chatMessages = [
  { id: '1', text: 'Good morning! Please note that tomorrow is a holiday.', isMine: false, time: '9:00 AM', sender: 'Mrs. Sharma' },
  { id: '2', text: 'Thank you for the update, teacher!', isMine: true, time: '9:15 AM' },
  { id: '3', text: 'Also, please make sure Aarav completes the math homework by Friday.', isMine: false, time: '9:20 AM', sender: 'Mrs. Sharma' },
  { id: '4', text: 'Sure, I will make sure of that. How is he doing in class?', isMine: true, time: '9:25 AM' },
  { id: '5', text: 'He is doing excellent! One of the top students in Mathematics. Keep encouraging him.', isMine: false, time: '9:30 AM', sender: 'Mrs. Sharma' },
  { id: '6', text: 'That is great to hear! Thank you teacher 🙏', isMine: true, time: '9:35 AM' },
];

export default function ParentMessages() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const { user } = useAuthStore();

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: String(messages.length + 1),
        text: message.trim(),
        isMine: true,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      }]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>S</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Mrs. Sharma</Text>
          <Text style={styles.headerSub}>Class 5A Teacher • Mathematics</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={22} color="#1E40AF" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.isMine ? styles.myMsg : styles.otherMsg]}>
            {!item.isMine && <Text style={styles.senderName}>{item.sender}</Text>}
            <Text style={[styles.msgText, item.isMine && { color: '#fff' }]}>{item.text}</Text>
            <Text style={[styles.msgTime, item.isMine && { color: '#BFDBFE' }]}>{item.time}</Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.attachBtn}>
          <Ionicons name="attach" size={22} color="#64748B" />
        </TouchableOpacity>
        <TextInput
          style={styles.msgInput}
          placeholder="Type a message..."
          placeholderTextColor="#94A3B8"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0', gap: 10,
  },
  headerAvatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#DBEAFE',
    justifyContent: 'center', alignItems: 'center',
  },
  headerAvatarText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  headerSub: { fontSize: 12, color: '#64748B' },
  msgBubble: { maxWidth: '78%', borderRadius: 16, padding: 12, marginBottom: 8 },
  myMsg: { backgroundColor: '#1E40AF', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  otherMsg: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  senderName: { fontSize: 11, fontWeight: '600', color: '#1E40AF', marginBottom: 2 },
  msgText: { fontSize: 14, color: '#1E293B', lineHeight: 20 },
  msgTime: { fontSize: 10, color: '#94A3B8', marginTop: 4, alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row', padding: 12, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'center', gap: 8,
  },
  attachBtn: { padding: 4 },
  msgInput: {
    flex: 1, backgroundColor: '#F1F5F9', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: '#1E293B',
  },
  sendBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: '#1E40AF',
    justifyContent: 'center', alignItems: 'center',
  },
});
