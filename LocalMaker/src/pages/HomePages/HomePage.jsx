import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Navbar from '../../Components/Navbar';
import { getUserProfessionRequest } from '../../services/profession.services';
import { getProfessionRequest } from '../../services/profession.services'; // Importa tu función de obtener profesiones
import { useNavigate } from 'react-router-native';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [userProfession, setUserProfession] = useState([]);
  const [professions, setProfessions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener profesiones
    const fetchProfessions = async () => {
      try {
        const professionsResponse = await getProfessionRequest();
        setProfessions(professionsResponse); // Almacena las profesiones en el estado
      } catch (error) {
        console.error('Error fetching professions:', error);
      }
    };

    fetchProfessions(); // Llama a la función para obtener profesiones al cargar la página
  }, []);

  useEffect(() => {
    // Función para obtener usuarios con profesiones
    const fetchUserProfessions = async () => {
      try {
        const response = await getUserProfessionRequest();
        setUserProfession(response.data.foundedProf);
      } catch (error) {
        console.error('Error fetching User Professions:', error);
      }
    };

    fetchUserProfessions(); // Llama a la función para obtener usuarios con profesiones al cargar la página
  }, []);

  const handleMoreInfoPress = (professional) => {
    navigate('/informationProfession', { state: { professional } });
  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        {userProfession.map((professional, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderContent}>
                <Text style={styles.cardTitle}>{professional.name} {professional.surname}</Text>
                <Image source={{ uri: professional.profilePicture }} style={styles.profilePicture} />
              </View>
              <Text style={styles.cardStock}>
                Profesiones:
              </Text>
              {/* Mostrar nombres de profesiones en lugar de IDs */}
              {professional.profession && professional.profession.map((profId, i) => (
                <Text key={i} style={styles.cardStock}>
                  {professions((prof) => prof._id === profId).name}
                </Text>
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
  containerLetters: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    color: 'white',
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
    color: 'white',
    textAlign: width > 600 ? 'left' : 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
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
    backgroundColor: 'black',
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
  cardPrice: {
    fontSize: 18,
    color: 'white',
  },
  cardStock: {
    fontSize: 16,
    color: '#38b2ac',
  },
  cardBody: {
    padding: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#38b2ac',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardFooterText: {
    fontSize: 12,
    color: '#718096',
  },
});

export default HomePage;
