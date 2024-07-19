import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import io from 'socket.io-client';
import Navbar from './Navbar';
import { useRoute } from '@react-navigation/native';

const ChatRoom = () => {
  const route = useRoute();
  const { professional } = route.params; 
  const socket = io('http://192.168.43.194:3000'); // Cambia esto a la dirección de tu servidor

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Unirse a la sala del profesional
    socket.emit('join chat', professional._id);

    // Escuchar mensajes de chat
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]); // Agregar nuevo mensaje
    });

    // Escuchar mensajes anteriores al conectarse
    socket.on('previous messages', (msgs) => {
      setMessages(msgs); // Configurar mensajes anteriores
    });

    return () => {
      socket.off('chat message');
      socket.off('previous messages');
    };
  }, [professional._id]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Emitir el mensaje junto con el ID del profesional
      socket.emit('chat message', { msg: message, professionalId: professional._id });
      setMessage('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.msg}</Text>
    </View>
  );

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          inverted={false} // Mostrar el más reciente al final
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2B6CB0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatRoom;
