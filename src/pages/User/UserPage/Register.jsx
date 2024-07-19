import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../../Components/Input';
import { registerValidateSchema } from '../../../validationSchemas/register';
import { registerRequest } from '../../../services/user.services';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    locality: '',
    profilePicture: '',
  };

  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  const registro = async (values) => {
    try {
      initialValues.name = values.name;
      initialValues.surname = values.surname;
      initialValues.email = values.email;
      initialValues.username = values.username;
      initialValues.password = values.password;
      initialValues.phone = values.phone;
      initialValues.locality = values.locality;
      initialValues.profilePicture = profileImage;

      await registerRequest(initialValues);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al registrarse', error);
    }
  };

  const handleChooseProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Se requiere permiso para acceder a la galería.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      console.log('Selección de imagen cancelada');
      return;
    }

    const selectedImageUri = pickerResult.assets[0].base64;
    setProfileImage(`data:image/jpeg;base64,${selectedImageUri}`); 
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
              <Input
                placeholder='Username'
                name='username'
                style={styles.input}
                placeholderTextColor='#38b2ac'
              />
              <Input
                placeholder='Email'
                name='email'
                style={styles.input}
                placeholderTextColor='#38b2ac'
              />
              <Input
                placeholder='Password'
                name='password'
                style={styles.input}
                secureTextEntry
                placeholderTextColor='#38b2ac'
              />
              <Input
                placeholder='Nombre'
                name='name'
                style={styles.input}
                placeholderTextColor='#38b2ac'
              />
              <Input
                placeholder='Apellido'
                name='surname'
                style={styles.input}
                placeholderTextColor='#38b2ac'
              />
              <Input
                placeholder='Teléfono'
                name='phone'
                style={styles.input}
                placeholderTextColor='#38b2ac'
              />
              <Input
                placeholder='Localidad'
                name='locality'
                style={styles.input}
                placeholderTextColor='#38b2ac'
              />
              <TouchableOpacity onPress={handleChooseProfilePicture} style={styles.button}>
                <Text style={styles.buttonText}>Seleccionar Imagen de Perfil</Text>
              </TouchableOpacity>
              {profileImage && (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                </View>
              )}
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerText}>¿Ya tiene una cuenta? Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
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
    backgroundColor: '#2d3748',
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
    borderWidth: 1,
    borderColor: '#00ff00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 10,
    color: '#38b2ac',
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
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#38b2ac',
  },
});

export default Register;
