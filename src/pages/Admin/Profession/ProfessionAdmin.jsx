import React, { useState } from 'react';
import { Formik } from 'formik';
import Input from '../../../Components/Input';
import Navbar from '../../../Components/Navbar';
import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import { newProfession } from '../../../services/profession.services';

const ProfessionAdmin = () => {
  const initialValues = {
    name: '',
    description: '',
    image: 'No hay Imagen'
  };
  
  const navigate = useNavigate();

  const AgregarPro = async (values) => {
    try {
      await newProfession(values);
      navigate('/HomePageAdmin');
    } catch (error) {
      console.error('No puedo');
    }
  };
  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}></Text>
          <Text style={styles.subtitle}>Agregar Nuevas Profesiones</Text>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => AgregarPro(values)}
          >
            {({ handleSubmit }) => (
              <View style={styles.form}>
                <Input
                  placeholder='Nombre de la profesión'
                  name='name'
                  style={styles.input}
                  placeholderTextColor='#38b2ac'
                />
                <Input
                  placeholder='Descripción'
                  name='description'
                  style={styles.input}
                  placeholderTextColor='#38b2ac'
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
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
});

export default ProfessionAdmin;
