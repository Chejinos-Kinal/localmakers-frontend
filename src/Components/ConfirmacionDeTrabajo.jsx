import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from './Navbar';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateStatusRequest } from '../services/transaction.services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmacionDeTrabajo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userRole, setUserRole] = useState('');
  const { TransaccionProfesional } = route.params;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role from AsyncStorage', error);
      }
    };

    fetchUserRole();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy'); // Formatea la fecha a 'dd/MM/yyyy'
  };

  const handleUpdate = async (id) => {
    try {
      if (userRole === 'PROFESSIONAL') {
        await updateStatusRequest(id, { statusProfesional: true });
        navigation.navigate('Notificaciones');
      } else {
        await updateStatusRequest(id, { statusCliente: true });
        navigation.navigate('Review', { TransaccionProfesional });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.description}>Precio: Q.{TransaccionProfesional.finalOffer.price}.00</Text>
          <Text style={styles.description}>Fecha: {formatDate(TransaccionProfesional.finalOffer.workDate)}</Text>
          <Text style={styles.contact}>Ubicación: {TransaccionProfesional.finalOffer.workSite}</Text>
        </View>
        <View style={styles.containerButton}>
          {userRole === 'PROFESSIONAL' && (
            <TouchableOpacity style={styles.cardButton} onPress={() => handleUpdate(TransaccionProfesional._id)}>
              <Text style={styles.cardButtonText}>Empezar trabajo</Text>
            </TouchableOpacity>
          )}
          {userRole === 'CLIENT' && TransaccionProfesional.statusProfesional && (
            <TouchableOpacity style={styles.cardButton} onPress={() => handleUpdate(TransaccionProfesional._id)}>
              <Text style={styles.cardButtonText}>Ya termino el trabajo el Profesional</Text>
            </TouchableOpacity>
          )}
        </View>
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
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardButton: {
    backgroundColor: '#2B6CB0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#81e6d9',
    marginBottom: 10,
  },
  description: {
    paddingTop: 25,
    fontSize: 16,
    color: '#81e6d9',
    marginBottom: 10,
    textAlign: 'center',
  },
  contact: {
    paddingTop: 15,
    fontSize: 16,
    color: '#81e6d9',
    marginBottom: 5,
  },
});

export default ConfirmacionDeTrabajo;
