import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Navbar from '../../../Components/Navbar';
import { Formik } from 'formik';
import Input from '../../../Components/Input';
import { getReviewAdminRequest } from '../../../services/review.services';
import { format } from 'date-fns';

const ReviewAdmin = () => {
  const [initialValues, setInitialValues] = useState({
    email: ''
  });
  const [reviewData, setReviewData] = useState(null);

  const handleCustomBlur = async (values) => {
    const emailProfesion = values.email;
    const response = await getReviewAdminRequest(emailProfesion);
    setReviewData(response.data.foundReviews); // Almacena la respuesta en el estado local
  };
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
};


  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleBlur, values, setFieldValue }) => (
            <Input
              placeholder='Agregar el correo del usuario a buscar'
              placeholderTextColor='#81e6d9' 
              name='email'
              onBlur={() => {
                setInitialValues((prevValues) => ({
                  ...prevValues,
                  email: values.email,
                }));
                handleBlur('email');
                handleCustomBlur(values); // Llama a la función handleCustomBlur personalizada
              }}
              onChangeText={(text) => setFieldValue('email', text)}
              value={values.email}
            />
          )}
        </Formik>
        {reviewData && (
          <>
            {reviewData.map((review) => (
              <View key={review._id} style={styles.reviewContainer}>
                <Text style={styles.reviewText}>Fecha: {formatDate(review.date)}</Text>
                <Text style={styles.reviewText}>Calificación: {review.rating}</Text>
                <Text style={styles.reviewText}>Descripción: {review.description}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    width: '100%',
    minHeight: '100%',
  },
  reviewContainer: {
    backgroundColor: '#2d3748',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  reviewText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReviewAdmin;
