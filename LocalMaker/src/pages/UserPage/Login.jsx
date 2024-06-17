import React, { useState } from 'react';
import { Formik } from 'formik';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { loginValidationSchema } from '../../validationSchemas/login';
import { loginRequest } from '../../services/user.services';
import { useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../Components/Input';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const initialValues = {
    username: '',
    password: ''
  };
  const styles = StyleSheet.create({
    form: {
      margin: 12
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    registerText: {
      marginTop: 10,
      color: 'blue',
    },
  });

  const navigate = useNavigate();
  const login = async (values) => {
    try {
      const response = await loginRequest(values);

      if (response && response.data && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        navigate('/HomePage');
      } else {
        setErrorMessage('Usuario o contraseña inválido');
      }
    } catch (error) {
      console.error('Error general al intentar iniciar sesión', error);
      setErrorMessage('Usuario o contraseña inválido');
    }
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={values => login(values)}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <Input
            placeholder='Usuario'
            name='username'
          />
          <Input
            placeholder='Contraseña'
            name='password'
            secureTextEntry
          />
          <Button onPress={handleSubmit} title='Log In' />
          <TouchableOpacity onPress={() => navigate('/Register')}>
            <Text style={styles.registerText}>No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Login;
