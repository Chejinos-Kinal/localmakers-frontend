import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Navbar from '../../../Components/Navbar';
import { useNavigate } from 'react-router-native';  
const { width } = Dimensions.get('window');

const HomePageAdmin = () => {
  const navigate = useNavigate();  

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Vista administrador</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigate('/ProfessionAdmin')} style={styles.button}>
            <Text style={styles.buttonText}>Agregar Profesiones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Crear nuevos admin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Información del Profesional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Estadísticas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerLetters}>
          <Image source={require('../../../img/LogoSinFondo.png')} style={styles.logo} />
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2B6CB0',
    padding: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomePageAdmin;
