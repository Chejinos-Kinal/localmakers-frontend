import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Navbar from '../../../Components/Navbar';
import { getProfessions } from '../../../services/profession.services';
import { useNavigation } from '@react-navigation/native';
import { dataUserRequest, UpdateUser } from '../../../services/user.services'; // Asumiendo que UpdateUser está importado correctamente

 
const { width } = Dimensions.get('window');
 
const BecomeProfessional = () => {

  const [profession, setProfession] = useState([]);
  const [selectProfessions, setSelectProfessions] = useState([]);
  const [user, setUser] = useState({ profession: [] }); // Inicializa con un arreglo vacío por seguridad
  
  const navigation = useNavigation();

  const hasProfessions = user.profession.length > 0;

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await getProfessions();
        setProfession(response.data.foundedProfessions);
      } catch (error) {
        console.error('Error al obtener las profesiones', error);
      }
    };

    fetchProfessions();
  }, []);

  useEffect(() => {
    const getProfession = async () => {
      try {
        const response = await dataUserRequest();
        setUser(response.data.foundedData);
      } catch (error) {
        console.error(error);
      }
    };
    getProfession();
  }, []);

  const buttonState = (profe) => {
    try {
      if (selectProfessions.includes(profe._id)) {
        // Deseleccionar si ya está seleccionado
        setSelectProfessions(selectProfessions.filter((id) => id !== profe._id));
      } else {
        // Verificar cantidad máxima de selecciones (5)
        if (selectProfessions.length < 5) {
          setSelectProfessions([...selectProfessions, profe._id]);
        } else {
          // No hacer nada si ya se seleccionaron 5
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateState = async () => {
    try {
      const data = {
        role: 'PROFESSIONAL', // Siempre actualizar el rol a 'PROFESSIONAL'
      };

      if (!hasProfessions) {
        // Solo actualizar las profesiones si el usuario no tiene profesiones ya
        data.profession = selectProfessions;
      }

      await UpdateUser(data);
      navigation.navigate('Login'); // Agregar un parámetro de tiempo para forzar la recarga
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.subheading}>
          ¿LISTO PARA SER UNO MÁS DE NUESTRO EQUIPO DE PROFESIONALES?
        </Text>
        <Text style={style.text}>
          Activa tu lado profesional para poder ofrecer un servicio profesional
          a las personas. Una manera para poder ganar dinero haciendo lo que
          más quieras.
        </Text>

        <View style={style.containerTop}></View>
        <View style={style.container}>
          <Text style={style.subheading}>
            SELECCIONA CUÁLES SON TUS PROFESIONES O HABILIDADES
          </Text>
          {hasProfessions ? (
            <Text style={style.text}>
              Ya tienes profesiones seleccionadas.
            </Text>
          ) : (
            profession.map((profe) => (
              <View key={profe._id}>
                <TouchableOpacity
                  onPress={() => buttonState(profe)}
                  style={[
                    style.buttonProfession,
                    {
                      borderColor: selectProfessions.includes(profe._id)
                        ? 'red'
                        : '#00ff00',
                    },
                  ]}
                >
                  <Text style={style.buttonText}>{profe.name}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        <View style={style.containerButton}>
          <TouchableOpacity onPress={updateState} style={style.button}>
            <Text style={style.buttonText1}>¡Activar Ahora!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
     
     
    </>
  )
  
}
const style = StyleSheet.create({
  container: {
  
    flexGrow: 1,
    backgroundColor: '#1a202c',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical:20,
  },
  containerTop: {
      backgroundColor: '#1a202c',
      paddingTop: 10
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
    paddingTop: 50,
    
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText1:{
    color: '#000',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#00ff00',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonProfession: {
    borderWidth: 1,
    borderColor: '#00ff00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    marginTop: 10,
  },
});

 
export default BecomeProfessional