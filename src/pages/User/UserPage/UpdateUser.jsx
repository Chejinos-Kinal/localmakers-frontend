import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Input from '../../../Components/Input';
import { registerValidateSchema } from '../../../validationSchemas/register';
import { dataUserRequest, registerRequest } from '../../../services/user.services';
import { useNavigate } from 'react-router-native';
import Navbar from '../../../Components/Navbar';

const UpdateUser = () => {
    const [user, setUser] = useState([])
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm:'',
    phone: '',
    locality: '',
    profilePicture: '',
  };

  useEffect(()=>{
    try {
        const response = dataUserRequest()
        setUser(response.data)
    } catch (error) {
        console.error('Error al ver los datos del usuario', error)
    }
  },[])
  console.log(user)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a202c',
    },
    scrollViewContent: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    form: {
      width: '100%',
      backgroundColor: '#ffff',
      padding: 20,
      borderRadius: 10,
    },
    input: {
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      color: '#fff',
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#00ff00',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    registerText: {
      marginTop: 10,
      color: '#000',
      textAlign: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
  });

  const navigate = useNavigate();

  const registro = async (values) => {
    try {
     
    } catch (error) {
      console.error('Error al registrarse');
    }
  };

  return (
    <>
    <Navbar/>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Actualiza o elimina tu cuenta</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => registro(values)}
        >
          {({ handleSubmit }) => (
            <View style={styles.form}>
              <Input
                placeholder='Username'
                name='username'
                style={styles.input}
                placeholderTextColor="#000"
              />
              <Input
                placeholder='Email'
                name='email'
                style={styles.input}
                 placeholderTextColor="#000"
              />
              <Input
                placeholder='Password'
                name='password'
                style={styles.input}
                secureTextEntry
                 placeholderTextColor="#000"
              /><Input
              placeholder='passwordConfirm'
              name='passwordConfirm'
              style={styles.input}
              secureTextEntry
               placeholderTextColor="#000"
            />
              <Input
                placeholder='Nombre'
                name='name'
                style={styles.input}
                 placeholderTextColor="#000"
              />
              <Input
                placeholder='Apellido'
                name='surname'
                style={styles.input}
                placeholderTextColor="#000"
              />
              <Input
                placeholder='Teléfono'
                name='phone'
                style={styles.input}
                 placeholderTextColor="#000"
              />
              <Input
                placeholder='Localidad'
                name='locality'
                style={styles.input}
                 placeholderTextColor="#000"
              />
              <Input
                placeholder='Ruta de la imagen'
                name='profilePicture'
                style={styles.input}
                 placeholderTextColor="#000"
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
    </>
  );
};

export default UpdateUser;
