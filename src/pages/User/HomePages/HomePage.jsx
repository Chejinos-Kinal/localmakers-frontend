import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Navbar from '../../../Components/Navbar'
import { getUserProfessionRequest } from '../../../services/profession.services';
import { useNavigate } from 'react-router-native';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [userProfession, setUserProfession] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfessions = async () => {
      try {
        const response = await getUserProfessionRequest();
        setUserProfession(response.data.foundedProf);
      } catch (error) {
        console.error('Error fetching User Professions:', error);
      }
    };

    fetchUserProfessions();
  }, []);


  
  const handleMoreInfoPress = (professional) => {
    navigate('/informationProfession', { state: { professional } });
  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Oferta de Trabajo</Text>
        </View>
        {userProfession.map((professional, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderContent}>
                <Text style={styles.cardTitle}>{professional.name} {professional.surname}</Text>
                <Image source={{ uri: professional.profilePicture }} style={styles.profilePicture} />
              </View>
              <Text style={styles.cardStock}>Profesiones:</Text>
              {professional.profession.map((prof, i) => (
                <Text key={i} style={styles.professionName}>{prof.name}</Text>
              ))}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>{professional.description}</Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => handleMoreInfoPress(professional)}>
                <Text style={styles.cardButtonText}>Información</Text>
              </TouchableOpacity>
              <Text style={styles.cardFooterText}>TEL: {professional.phone} | Email: {professional.email}</Text>
            </View>
          </View>
        ))}
        <View style={styles.containerLetters}>
          <Text style={styles.heading}>CONOCE MÁS SOBRE NOSOTROS</Text>
        </View>
        <View style={styles.containerInformation}>
          <View style={styles.containerInformationLeft}></View>
          <View style={styles.containerInformationRight}>
            <Text style={styles.subheading}>VISIÓN:</Text>
            <Text style={styles.text}>
              Crear un entorno en el cual las personas no sufran por problemas de
              empleo, convirtiendo a las personas en emprendedores independientes.
            </Text>
            <Text style={styles.subheading}>MISIÓN</Text>
            <Text style={styles.text}>
              Crear una aplicación en la cual podamos obtener un empleo para el
              cual todas las personas puedan obtener un empleo o tareas a cambio
              de dinero.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    width: '100%',
    minHeight: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#81e6d9',
    fontWeight: 'bold',
    fontSize: 28,
  },
  containerLetters: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    color: '#81e6d9',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  containerInformation: {
    flexDirection: width > 600 ? 'row' : 'column',
    marginVertical: 20,
    width: '100%',
  },
  containerInformationLeft: {
    width: width > 600 ? '50%' : '100%',
  },
  containerInformationRight: {
    width: width > 600 ? '50%' : '100%',
    paddingLeft: width > 600 ? 10 : 0,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#81e6d9',
    textAlign: width > 600 ? 'left' : 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#81e6d9',
    textAlign: width > 600 ? 'left' : 'center',
    paddingHorizontal: width > 600 ? 0 : 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
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
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardStock: {
    fontSize: 16,
    color: '#A0AEC0',
  },
  professionName: {
    fontSize: 14,
    color: '#CBD5E0',
  },
  cardBody: {
    padding: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2D3748',
  },
  cardButton: {
    backgroundColor: '#2B6CB0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardFooterText: {
    fontSize: 12,
    color: '#718096',
  },
});

export default HomePage;
