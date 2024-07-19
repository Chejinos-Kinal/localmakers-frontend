import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../../../Components/Navbar';
import { Formik } from 'formik';
import Input from '../../../Components/Input';
import {  useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { newFinalOffer } from '../../../services/FinalOffer.services';
import { finalOfferValidateSchema } from '../../../validationSchemas/finalOffer';

const FinalOffer = () => {
  const route = useRoute();
  const { workOfFer } = route.params;
  const navigation = useNavigation()
  const initialDate = new Date(); 

  const initialValues = {
    workDate: initialDate, 
    workSite: workOfFer.workSite || 'Localidad Del Profesional',
    price: '',
  };

  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false)
    setDate(adjustedDate);
    console.log(adjustedDate)
  };

  const showDatePicker = () => {
    setShow(true)
  };

  const formatSpanishDate = (date) => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
      'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()]
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`
  };

  const handleSubmit = async (values) => {
    try {

      const formData = {
        ...values,
        workDate: date
      };
      await newFinalOffer(formData, workOfFer.user._id, workOfFer.professional._id, workOfFer._id)
      navigation.navigate('Notificaciones')
    } catch (error) {
      console.error('Error submitting form:', error)

    }
  };
 
  const formattedDate = formatSpanishDate(date);

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Contra oferta</Text>
            <Image source={require('../../../img/LogoSinNombreSinFondo.png')} style={styles.logo} />
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={finalOfferValidateSchema}
          >
            {({ values, setFieldValue }) => (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Fecha a realizar el trabajo</Text>
                  <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={onChange}
                    />
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Precio</Text>
                  <Input
                    name='price'
                    style={styles.input}
                    placeholder="Escribe el precio para el trabajo"
                    placeholderTextColor="#999"
                    value={values.price}
                    onChangeText={(text) => setFieldValue('price', text)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Lugar donde se va a hacer el trabajo</Text>
                  <Picker
                    selectedValue={values.workSite}
                    onValueChange={(itemValue) => setFieldValue('workSite', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecciona " value="" />
                    <Picker.Item label="Mi localidad" value="Localidad del profesional" />
                    {workOfFer.workSite && <Picker.Item label={workOfFer.workSite} value={workOfFer.workSite} />}
                  </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit(values)}>
                  <Text style={styles.buttonText}>Enviar Oferta</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a202c',
    alignItems: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#2d3748',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38b2ac',
  },
  logo: {
    height: 50,
    width: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#81e6d9',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#4a5568',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: '#4a5568',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#4a5568',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3182ce',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sideImage: {
    width: Dimensions.get('window').width,
    height: 200,
    marginTop: 20,
  },
});

export default FinalOffer;
