import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { newPagoAdmin } from '../../../services/account.services';

const AccountA = () => {
  const [amount, setAmount] = useState(''); // Estado para almacenar el monto ingresado

  const navigation = useNavigation();
  const route = useRoute();
  const { account } = route.params;

  const handleDeposit =  async() => {
    await newPagoAdmin(account._id, {monto: amount})
    navigation.navigate('HomePageAdmin')
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: account.user.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{account.user.name} {account.user.surname}</Text>
        <Text style={styles.description}>{account.user.description}</Text>
        <Text style={styles.contact}>Ubicación: {account.user.locality}</Text>
        <Text style={styles.contact}>TEL: {account.user.phone}</Text>
        <Text style={styles.contact}>Email: {account.user.email}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>Credito: {account.credito}</Text>
        <Text style={styles.name}>Deuda: {account.deuda}</Text>
      </View>
      <View style={styles.borderStyle}>
        <TextInput
          style={styles.input}
          placeholder="Monto a depositar"
          placeholderTextColor="#81e6d9"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)} // Actualiza el estado con el monto ingresado
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={handleDeposit}>
          <Text style={styles.buttonText}>Depositar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a202c',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 20,
  },
  containerButton: {
    flexGrow: 1,
    backgroundColor: '#1a202c',
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 10,
  },
  borderStyle: {
    borderBottomColor: '#81e6d9',
    borderBottomWidth: 2,
    paddingTop: 15,
  },
  input: {
    borderBottomColor: '#81e6d9',
    borderBottomWidth: 1,
    color: '#81e6d9',
    marginBottom: 20,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00ff00',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 15,
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
    width: 150,
    height: 150,
    borderRadius: 10,
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
});

export default AccountA;
