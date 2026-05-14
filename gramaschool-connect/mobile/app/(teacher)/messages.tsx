import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/auth';

const conversations = [
  { id: '1', name: 'Sunita Devi (Aarav\'s mom)', lastMsg: 'Thank you teacher', time: '10:30 AM', unread: 0 },
  { id: '2', name: 'Rajesh Kumar (Priya\'s dad)', lastMsg: 'She will be absent tomorrow', time: '9:45 AM', unread: 1 },
  { id: '3', name: 'Class 5A Group', lastMsg: 'Homework submitted by all', time: 'Yesterday', unread: 5 },
  { id: '4', name: 'Meena Kumari (Rahul\'s mom)', lastMsg: 'Is there any exam next week?', time: 'Yesterday', unread: 2 },
  { id: '5', name: 'Principal - Admin', lastMsg: 'Please submit monthly report', time: 'Mon', unread: 0 },
];

const chatMessages = [
  { id: '1', text: 'Good morning teacher! How is Aarav doing in class?', isMine: false, time: '9:00 AM', sender: 'Sunita Devi' },
  { id: '2', text: 'Good morning! Aarav is doing very well in Mathematics. He scored 95% in the last test.', isMine: true, time: '9:10 AM' },
  { id: '3', text: 'That\'s wonderful! Thank you for the update.', isMine: false, time: '9:15 AM', sender: 'Sunita Devi' },
  { id: '4', text: 'He should practice Chapter 5 exercises for the upcoming exam.', isMine: true, time: '9:20 AM' },
  { id: '5', text: 'Sure, I will make sure he practices. Thank you teacher!', isMine: false, time: '9:25 AM', sender: 'Sunita Devi' },
];

export default function TeacherMessages() {
  const [showChat, setShowChat] = useState(false);
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

  if (!showChat) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.newBtn}>
            <Ionicons name="create-outline" size={20} color="#059669" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.convoItem} onPress={() => setShowChat(true)}>
              <View style={styles.convoAvatar}>
                <Text style={styles.convoAvatarText}>{item.name[0]}</Text>
              </View>
              <View style={styles.convoInfo}>
                <Text style={styles.convoName}>{item.name}</Text>
                <Text style={styles.convoLast} numberOfLines={1}>{item.lastMsg}</Text>
              </View>
              <View style={styles.convoRight}>
                <Text style={styles.convoTime}>{item.time}</Text>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setShowChat(false)}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.chatAvatar}><Text style={styles.chatAvatarText}>S</Text></View>
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>Sunita Devi</Text>
          <Text style={styles.chatSub}>Aarav's Mother</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.isMine ? styles.myMsg : styles.otherMsg]}>
            {!item.isMine && <Text style={styles.senderName}>{item.sender}</Text>}
            <Text style={[styles.msgText, item.isMine && { color: '#fff' }]}>{item.text}</Text>
            <Text style={[styles.msgTime, item.isMine && { color: '#D1FAE5' }]}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.msgInput}
          placeholder="Type a message..."
          placeholderTextColor="#94A3B8"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  newBtn: { padding: 8 },
  convoItem: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    marginHorizontal: 16, marginBottom: 4, backgroundColor: '#fff', borderRadius: 12,
  },
  convoAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#D1FAE5',
    justifyContent: 'center', alignItems: 'center',
  },
  convoAvatarText: { fontSize: 18, fontWeight: 'bold', color: '#059669' },
  convoInfo: { flex: 1, marginLeft: 12 },
  convoName: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  convoLast: { fontSize: 13, color: '#64748B', marginTop: 2 },
  convoRight: { alignItems: 'flex-end', gap: 4 },
  convoTime: { fontSize: 11, color: '#94A3B8' },
  unreadBadge: {
    backgroundColor: '#059669', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2,
  },
  unreadText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  chatContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0', gap: 10,
  },
  chatAvatar: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#D1FAE5',
    justifyContent: 'center', alignItems: 'center',
  },
  chatAvatarText: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  chatInfo: {},
  chatName: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  chatSub: { fontSize: 12, color: '#64748B' },
  msgBubble: { maxWidth: '75%', borderRadius: 16, padding: 12, marginBottom: 8 },
  myMsg: { backgroundColor: '#059669', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  otherMsg: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  senderName: { fontSize: 11, fontWeight: '600', color: '#059669', marginBottom: 2 },
  msgText: { fontSize: 14, color: '#1E293B', lineHeight: 20 },
  msgTime: { fontSize: 10, color: '#94A3B8', marginTop: 4, alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row', padding: 12, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#E2E8F0', gap: 8,
  },
  msgInput: {
    flex: 1, backgroundColor: '#F1F5F9', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: '#1E293B',
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: '#059669',
    justifyContent: 'center', alignItems: 'center',
  },
});
