import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import Navbar from '../../../Components/Navbar'
import { useNavigate } from 'react-router-native';
 
const { width } = Dimensions.get('window');
 
const BecomeProfessional = () => {
  const style = StyleSheet.create({
    container: {
    
      flexGrow: 1,
      backgroundColor: '#1a202c',
      paddingLeft:10,
      paddingRight: 10,
      paddingVertical:20,
    },
    containerTop: {
        backgroundColor: '#1a202c',
        paddingTop:10
      },
    containerButton: {
      flexGrow: 1,
      backgroundColor: '#1a202c',
      paddingLeft: 50,
      paddingRight: 50,
      paddingVertical:10,
 
    },
    borderStyle: {
        paddingTop:100,
      borderTopColor: '#81e6d9',
      borderTopWidth: 2,
      
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
      color: '#000',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#00ff00',
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 15,
      alignItems: 'center',
    },
  })
 
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <View style={style.containerTop} ></View>
      <View
        style={[style.container, style.borderStyle]}
      >
        <Text style={style.subheading}>¿LISTO PARA SER PROFESIONAL?</Text>
          <Text style={style.text}>Activa tu lado profesional para poder ofrecer un servicio profesional a las personas.
            Una manera para poder ganar dinero haciendo lo que más quieras.
          </Text>
          <View style={style.containerButton}>
            <TouchableOpacity onPress={() => navigate('/HomePage')} style={style.button}>
                <Text style={style.buttonText}>!Activar Ahora¡</Text>
            </TouchableOpacity>
          </View>
      </View>
     
     
    </>
  )
}
 
export default BecomeProfessional