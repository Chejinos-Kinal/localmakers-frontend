import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from '../../../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-native';
import Input from '../../../Components/Input';
import { Formik } from 'formik';
import { createWorkOffertRequest } from '../../../services/workOffer.services';

const MakeWorkOffer = () => {
  const location = useLocation();
  const initialValues = {
    title: '',
    problemDescription: '',
    workSite: '' 
  };
  const navigate = useNavigate();
  const { professional } = location.state;

  const createWorkOffer = async (values) => {
    const idProf = professional._id;
    await createWorkOffertRequest(values, idProf);
  

  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Oferta de Trabajo</Text>
            <Image source={require('../../../img/LogoSinNombreSinFondo.png')} style={styles.logo} />
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => createWorkOffer(values)}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Asunto (Título del trabajo)</Text>
                  <Input
                    name='title'
                    style={styles.input}
                    placeholder="Escribe el asunto de tu problema a resolver"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Descripción del problema</Text>
                  <Input
                    name='problemDescription'
                    style={[styles.input, styles.textArea]}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Puedes incluir el trabajo a realizar, el precio estimado que puedes pagar o más especificaciones."
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Localización del trabajo a realizar</Text>
                  <Picker
                    selectedValue={values.workSite}
                    onValueChange={(itemValue) => setFieldValue('workSite', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="" value="Localidad Del Profesional" />
                    <Picker.Item label="Zona 1" value="zona-1" />
                    <Picker.Item label="Zona 2" value="zona-2" />
                    <Picker.Item label="Zona 3" value="zona-3" />
                    <Picker.Item label="Zona 4" value="zona-4" />
                    <Picker.Item label="Zona 5" value="zona-5" />
                    <Picker.Item label="Zona 6" value="zona-6" />
                    <Picker.Item label="Zona 7" value="zona-7" />
                    <Picker.Item label="Zona 8" value="zona-8" />
                    <Picker.Item label="Zona 9" value="zona-9" />
                  </Picker>
                </View>

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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

export default MakeWorkOffer;
