import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from '../../../Components/Navbar';
import { getReviewProfesionalRequest } from '../../../services/review.services';
import { FontAwesome } from '@expo/vector-icons'; // Necesitarás instalar @expo/vector-icons si aún no lo has hecho

const ProfessionalInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [review, setReview] = useState({ reviews: [], averageRating: 0 });
  const { professional } = route.params;

  useEffect(() => {
    const fetchReviewProfesional = async () => {
      try {
        const response = await getReviewProfesionalRequest(professional._id);
        setReview(response.data || { reviews: [], averageRating: 0 });
      } catch (error) {
        console.error('Error al listar los review del profesional ', error);
        setReview({ reviews: [], averageRating: 0 }); // fallback to default
      }
    }
    fetchReviewProfesional();
  }, [professional._id]);

  const averageRating = review.averageRating || 0;

  const handleMakeWorkOffer = () => {
    navigation.navigate('MakeWorkOffer', { professional });
  };

  const handleChat = () => {
    navigation.navigate('ChatRoom', { professional });
  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: professional.profilePicture }} style={styles.profilePicture} />
          <Text style={styles.name}>{professional.name} {professional.surname}</Text>
          <Text style={styles.description}>{professional.description}</Text>
          <Text style={styles.contact}>Ubicación: {professional.locality}</Text>
          <Text style={styles.contact}>TEL: {professional.phone}</Text>
          <Text style={styles.contact}>Email: {professional.email}</Text>

          {/* Mostrar las estrellas basadas en averageRating */}
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
                key={star}
                name={star <= averageRating ? "star" : "star-o"}
                size={30}
                color={star <= averageRating ? "#ffdd44" : "#a89ec9"}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.offerButton} onPress={handleMakeWorkOffer}>
          <Text style={styles.offerButtonText}>REALIZAR OFERTA DE TRABAJO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Text style={styles.chatButtonText}>INICIAR CHAT</Text>
        </TouchableOpacity>

        {review.reviews && review.reviews.length > 0 && (
          <>
            <View style={styles.conteinerReview}>
              <Text style={styles.name}>Comentarios:</Text>
            </View>
            <View style={styles.conteinerReview}>
              {review.reviews.map((rev, index) => (
                <View key={index} style={styles.containerCard}>
                  <Text style={styles.textCard}>{rev.description}</Text>
                </View>
              ))}
            </View>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#2d3748',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#81e6d9',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#81e6d9',
    marginBottom: 10,
    textAlign: 'center',
  },
  contact: {
    fontSize: 16,
    color: '#81e6d9',
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  offerButton: {
    backgroundColor: '#2B6CB0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  offerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatButton: {
    backgroundColor: '#38A169',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  chatButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerCard: {
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#FFFF',
    backgroundColor: '#2d3748',
    width: '100%',
    height: 80,
    alignSelf: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  textCard: {
    color: '#81e6d9',
    fontSize: 15,
  },
  conteinerReview: {
    paddingTop: 28,
  },
});

export default ProfessionalInformation;
