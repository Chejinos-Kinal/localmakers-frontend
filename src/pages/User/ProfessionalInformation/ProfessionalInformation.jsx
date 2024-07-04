import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocation } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Navbar from '../../../Components/Navbar';
import ChatRoom from '../../../Components/ChatRoom'; // Importa el componente de chat

const ProfessionalInformation = () => {
  const location = useLocation();
  const { professional } = location.state;
  const navigation = useNavigate();

  const handleMakeWorkOffer = () => {
    navigation('/MakeWorkOffer', { state: { professional } });
  };

  const handleChat = () => {
    navigation('/ChatRoom', { state: { professional } }); // Navega a la pantalla de chat
  };

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: professional.profilePicture }} style={styles.profilePicture} />
          <Text style={styles.name}>{professional.name} {professional.surname}</Text>
          <Text style={styles.description}>{professional.description}</Text>
          <Text style={styles.contact}>Ubicación: {professional.locality}</Text>
          <Text style={styles.contact}>TEL: {professional.phone}</Text>
          <Text style={styles.contact}>Email: {professional.email}</Text>
        </View>
        <TouchableOpacity style={styles.offerButton} onPress={handleMakeWorkOffer}>
          <Text style={styles.offerButtonText}>REALIZAR OFERTA DE TRABAJO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Text style={styles.chatButtonText}>INICIAR CHAT</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#2d3748',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#81e6d9',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#81e6d9',
    marginBottom: 10,
    textAlign: 'center',
  },
  contact: {
    fontSize: 16,
    color: '#81e6d9',
    marginBottom: 5,
  },
  offerButton: {
    backgroundColor: '#2B6CB0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  offerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatButton: {
    backgroundColor: '#38A169',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  chatButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfessionalInformation;
