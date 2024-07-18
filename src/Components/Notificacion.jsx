import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from './Navbar';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteWorkOffertRequest } from '../services/workOffer.services';
import { format } from 'date-fns';

const Notificacion = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workOfFer } = route.params;
  const { finalOffer } = route.params
  
 

  const [role, setRole] = useState('');
  if(role === 'PROFESSION'){
    const professional = workOfFer.professional
  }
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
    navigation.navigate('Notificaciones')
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy'); // Formatea la fecha a 'dd/MM/yyyy'
};
const handleChat = () => {
  navigation.navigate('ChatRoom', { professional });
};


  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.containerTotal}>
      {role === 'PROFESSIONAL' && (
        
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
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('FinalOffer',  { workOfFer } )}>
              <Text style={styles.cardButtonText}>Realizar una Oferta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton} onPress={() => handleDelete(workOfFer._id)}>
              <Text style={styles.cardButtonText}>No estoy interesado</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerChat}>
          <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Text style={styles.chatButtonText}>MIRAR CHAT</Text>
        </TouchableOpacity>
          </View>
         
        </View>
        
      )}
      {role === 'CLIENT' && (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
          <Text style={styles.description}>{finalOffer.workOffer.title}</Text>
          <Text style={styles.description}>Descripción: {finalOffer.workOffer.problemDescription}</Text>
            <Text style={styles.description}>Precio: Q.{finalOffer.price}.00</Text>
            <Text style={styles.description}>Fecha: {formatDate( finalOffer.workDate)}</Text>
            <Text style={styles.contact}>Ubicación: {finalOffer.workSite}</Text>
          </View>
            <Text style={styles.name}>Informacion del profesional</Text>
            <View style={styles.profileContainer}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderContent}>
                  <Text style={styles.cardTitle}>{finalOffer.professional.name} {finalOffer.professional.surname}  </Text>
                  <Image source={{ uri: finalOffer.professional.profilePicture }} style={styles.profilePicture} />
                </View>
                <Text style={styles.contact} >Tel:{finalOffer.professional.phone}</Text>
                <Text style={styles.contact} >Tel:{finalOffer.professional.email}</Text>
              </View>
            </View>
            <View style={styles.containerButton}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('MetodoDePago',  { finalOffer } )}>
              <Text style={styles.cardButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>No estoy interesado</Text>
            </TouchableOpacity>
            </View>
          </View>
      
      )}
        </ScrollView>

    </>
  );
};
const styles = StyleSheet.create({
  containerTotal: {
    flexGrow: 1,
        backgroundColor: '#1a202c',
        width: '100%',
        minHeight: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    alignItems: 'center',
  },
  containerChat:{

    paddingTop: 20,
  
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
  chatButton: {
    paddingTop:10,
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

export default Notificacion;
