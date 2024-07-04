import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Input from '../../Components/Input';
import { registerValidateSchema } from '../../validationSchemas/register';
import { registerRequest } from '../../services/user.services';
import { useNavigate } from 'react-router-native';
import ImagePicker from 'react-native-image-picker';

const Register = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    locality: '',
    profilePicture: '', // Para almacenar la ruta de la imagen seleccionada
  };

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
      color: '#000',
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#00ff00',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
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
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
  });

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);

  const registro = async (values) => {
    try {
      // Aquí deberías enviar el formulario con la imagen a tu servicio de registro
      await registerRequest({ ...values, profilePicture: profileImage });
      navigate('/*');
    } catch (error) {
      console.error('Error al registrarse');
    }
  };

  const handleChooseProfilePicture = () => {
    const options = {
      title: 'Seleccionar imagen de perfil',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('Error:', response.error);
      } else {
        // Guardar la imagen seleccionada en el estado
        setProfileImage(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Registrarse</Text>
        <Text style={styles.subtitle}>Ingrese los datos para su cuenta</Text>
        <Formik
          validationSchema={registerValidateSchema}
          initialValues={initialValues}
          onSubmit={(values) => registro(values)}
        >
          {({ handleSubmit }) => (
            <View style={styles.form}>
              {/* Mostrar imagen seleccionada */}
              {profileImage && (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              )}
              {/* Botón para seleccionar imagen */}
              <TouchableOpacity onPress={handleChooseProfilePicture} style={styles.button}>
                <Text style={styles.buttonText}>Seleccionar Imagen de Perfil</Text>
              </TouchableOpacity>
              {/* Resto de campos de entrada */}
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
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('/Login')}>
                <Text style={styles.registerText}>¿Ya tiene una cuenta? Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default Register;
