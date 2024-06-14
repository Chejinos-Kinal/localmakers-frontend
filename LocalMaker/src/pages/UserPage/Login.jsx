import React from 'react';
import { Formik, useField } from 'formik';
import { Text, View, Button, StyleSheet } from 'react-native';
import StyledTextInput from './StyleInput';
import { loginValidationSchema } from '../../validationSchemas/login';
import { loginRequest } from '../../services/user.services';
import { useNavigate } from 'react-router-native'; // Importa useHistory desde react-router-native
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const initialValues = {
    username: '',
    password: ''
  };

  const styles = StyleSheet.create({
    form: {
      margin: 12
    },
    error: {
      color: 'red',
      fontSize: 12,
      marginBottom: 20,
      marginTop: -5
    }
  });

  const history = useNavigate(); // Usa useHistory para la navegación

  const FormikInputValue = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    return (
      <>
        <StyledTextInput
          error={meta.error}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {...props}
        />
        {meta.error && <Text style={styles.error}>{meta.error}</Text>}
      </>
    );
  };

  const login = async (values) => {
    try {
      const response = await loginRequest(values);
     
      if (response && response.data && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      
        history('/HomePage'); 
      } else {
        console.error('No se recibió un token válido en la respuesta');
      }
    } catch (error) {
      console.error('Error general al intentar iniciar sesión', error);
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
          <FormikInputValue
            placeholder='Username'
            name='username'
          />
          <FormikInputValue
            placeholder='Password'
            name='password'
            secureTextEntry
          />
          <Button onPress={handleSubmit} title='Log In' />
        </View>
      )}
    </Formik>
  );
};

export default Login;
