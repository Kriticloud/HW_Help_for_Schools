import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isMine: boolean;
}

const mockMessages: ChatMessage[] = [
  { id: '1', content: 'Good morning! Please note that tomorrow is a holiday.', senderId: 't1', senderName: 'Mrs. Sharma', timestamp: '9:00 AM', isMine: false },
  { id: '2', content: 'Thank you for the update, teacher!', senderId: 'p1', senderName: 'You', timestamp: '9:15 AM', isMine: true },
  { id: '3', content: 'Also, please make sure your child completes the math homework by Friday.', senderId: 't1', senderName: 'Mrs. Sharma', timestamp: '9:20 AM', isMine: false },
  { id: '4', content: 'Sure, I will make sure of that.', senderId: 'p1', senderName: 'You', timestamp: '9:25 AM', isMine: true },
  { id: '5', content: 'Parent-teacher meeting is scheduled for next Monday at 10 AM.', senderId: 't1', senderName: 'Mrs. Sharma', timestamp: '10:00 AM', isMine: false },
];

export default function MessagesScreen() {
  const [messages] = useState(mockMessages);
  const [newMsg, setNewMsg] = useState('');

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    // In production: call messagesService.send
    setNewMsg('');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[styles.msgRow, item.isMine && styles.msgRowMine]}>
      {!item.isMine && (
        <View style={styles.msgAvatar}>
          <Text style={styles.msgAvatarText}>{item.senderName[0]}</Text>
        </View>
      )}
      <View style={[styles.msgBubble, item.isMine ? styles.bubbleMine : styles.bubbleOther]}>
        {!item.isMine && <Text style={styles.senderName}>{item.senderName}</Text>}
        <Text style={[styles.msgText, item.isMine && styles.msgTextMine]}>{item.content}</Text>
        <Text style={[styles.timestamp, item.isMine && styles.timestampMine]}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>S</Text>
        </View>
        <View>
          <Text style={styles.headerName}>Mrs. Sharma</Text>
          <Text style={styles.headerSub}>Class 5A Teacher</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.msgList}
      />

      {/* Input */}
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.attachBtn}>
          <Ionicons name="attach" size={24} color="#64748B" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#94A3B8"
          value={newMsg}
          onChangeText={setNewMsg}
          multiline
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
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' },
  headerName: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  headerSub: { fontSize: 12, color: '#64748B' },
  msgList: { padding: 16 },
  msgRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  msgRowMine: { justifyContent: 'flex-end' },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  msgAvatarText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  msgBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
  },
  bubbleOther: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  bubbleMine: {
    backgroundColor: '#1E40AF',
    borderBottomRightRadius: 4,
  },
  senderName: { fontSize: 12, fontWeight: '600', color: '#1E40AF', marginBottom: 4 },
  msgText: { fontSize: 15, color: '#1E293B', lineHeight: 20 },
  msgTextMine: { color: '#fff' },
  timestamp: { fontSize: 11, color: '#94A3B8', marginTop: 4, alignSelf: 'flex-end' },
  timestampMine: { color: '#93C5FD' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
  },
  attachBtn: { padding: 8 },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1E293B',
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: '#1E40AF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
