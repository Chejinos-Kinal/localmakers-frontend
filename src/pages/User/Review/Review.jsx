import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Necesitarás instalar @expo/vector-icons si aún no lo has hecho
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { newReviewRequest } from '../../../services/review.services';

import Input from '../../../Components/Input'; // Asegúrate de que la ruta es correcta

const Review = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { TransaccionProfesional } = route.params;
  const [rating, setRating] = useState(0);

  const initialDate = new Date(); 
  const initialValues = {
    rating: rating,
    date: initialDate,
    description: '',
    user: TransaccionProfesional.user,
    userProfessional: TransaccionProfesional.professional._id
  };

  const handleStarPress = (value) => {
    setRating(value);
    initialValues.rating = value; // Update the rating in initialValues
  };

  const newReview = async(values) => {
    values.rating = rating;
    initialValues.description=  values.description 
    await newReviewRequest(initialValues)
    navigation.navigate('HomePage')
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.nft}>
          <View style={styles.header}>
            <Text style={styles.title}>{TransaccionProfesional.professional.name} {TransaccionProfesional.professional.surname}</Text>
            <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('HomePage')}>
              <Text style={styles.skipButtonText}>Omitir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            <Image
              style={styles.tokenImage}
              source={{ uri: TransaccionProfesional.professional.profilePicture }}
              alt="NFT"
            />
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <FontAwesome
                    name={star <= rating ? "star" : "star-o"}
                    size={40}
                    color={star <= rating ? "#ffdd44" : "#a89ec9"}
                  />
                </TouchableOpacity>
              ))}
            </View>
           
            <Text style={styles.description}>
              {TransaccionProfesional.professional.description}
            </Text>
            <View style={styles.tokenInfo}>
              <View style={styles.price}>
                <Text style={styles.priceText}>TEL: {TransaccionProfesional.professional.phone}</Text>
              </View>
              <View style={styles.duration}>
                <Text style={styles.durationText}>{TransaccionProfesional.professional.email}</Text>
              </View>
            </View>
            <View style={styles.hr} />
            <Formik
              initialValues={initialValues}
              onSubmit={newReview}
            >
              {({ handleSubmit, handleChange, values }) => (
                <View>
                  <Input
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    style={styles.input}
                    placeholderTextColor="#38b2ac"
                  />
                  <View style={styles.creator}>
                    <View style={styles.containerButton}>
                      <TouchableOpacity style={styles.cardButton} onPress={handleSubmit}>
                        <Text style={styles.cardButtonText}>Acepto</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
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
  nft: {
    userSelect: 'none',
    width: 300,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ffffff22',
    backgroundColor: '#282c34',
    background: 'linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(17,0,32,.5) 100%)',
    boxShadow: '0 7px 20px 5px #00000088',
    borderRadius: 10,
    overflow: 'hidden',
    transition: '.5s all',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  skipButton: {
    backgroundColor: '#ff6f61',
    padding: 8,
    borderRadius: 5,
  },
  skipButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  main: {
    flexDirection: 'column',
    width: '90%',
    padding: 16,
  },
  tokenImage: {
    borderRadius: 10,
    width: '100%',
    height: 150,
  },
  stars: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    paddingBottom: 10,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#000',
    marginBottom: 15,
    backgroundColor: '#2d3748',
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
  description: {
    fontSize: 14,
    color: '#a89ec9',
    marginBottom: 8,
  },
  tokenInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ee83e5',
    fontWeight: '700',
  },
  priceText: {
    color: '#ee83e5',
    fontWeight: '700',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#a89ec9',
  },
  durationText: {
    color: '#a89ec9',
  },
  hr: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#88888855',
    marginVertical: 8,
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#ffffff22',
    padding: 4,
    marginRight: 8,
    borderRadius: 50,
    boxShadow: 'inset 0 0 0 4px #000000aa',
  },
  creatorImage: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardButton: {
    backgroundColor: '#2B6CB0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Review;
