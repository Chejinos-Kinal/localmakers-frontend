import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteWorkOffertRequest } from '../services/workOffer.services';

const Notificacion = () => {
  const location = useLocation();
  const { workOfFer } = location.state;
  const {finalOffer} = location.state
  console.log(finalOffer)
  const [role, setRole] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        if (storedRole) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error('Error fetching role from AsyncStorage', error);
      }
    };
    fetchRole();
  }, []);

  const handleDelete = async (workOfferId) => {
    await deleteWorkOffertRequest(workOfferId)
    navigate('/Notificaciones')
  }
  return (
    <>
      <Navbar />
        {role === 'PROFESSIONAL' &&(
          <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Text style={styles.name}>Titulo</Text>
            <Text style={styles.name}>{workOfFer.title}</Text>
            <Text style={styles.description}>Descripción: {workOfFer.problemDescription}</Text>
            <Text style={styles.contact}>Ubicación: {workOfFer.workSite}</Text>
          </View>
          <Text style={styles.name}>El usuario que te quiere contratar es</Text>
          <View style={styles.profileContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderContent}>
                <Text style={styles.cardTitle}>{workOfFer.user.name} {workOfFer.user.surname}                </Text>
                <Image source={{ uri: workOfFer.user.profilePicture }} style={styles.profilePicture} />
              </View>
              <Text style={styles.contact} >Tel:{workOfFer.user.phone}</Text>
            </View>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.cardButton} onPress={()=> navigate('/FinalOffer',{state: {workOfFer}})}>
              <Text style={styles.cardButtonText}>Realizar una Oferta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton} onPress={() => handleDelete(workOfFer._id)}>
              <Text style={styles.cardButtonText}>No estoy interesado</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        {role === 'CLIENT' && (
          <View style={styles.container}>
               <View style={styles.profileContainer}>
               <Text style={styles.description}>Precio: Q.{finalOffer.price}</Text>
            <Text style={styles.description}>Descripción: {finalOffer.workOffer.problemDescription}</Text>
            <Text style={styles.contact}>Ubicación: {finalOffer.workSite}</Text>
                </View>
          </View>
        )}
   
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

  cardHeader: {
    backgroundColor: '#2d3748',
    padding: 20,
  },
  cardHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#81e6d9'
  },

});

export default Notificacion;
