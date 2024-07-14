import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Navbar from '../../../Components/Navbar';
import { getAccount } from '../../../services/account.services';
import { getReviewProfesionalStarRequest } from '../../../services/review.services'; // Import the new function
import { FontAwesome } from '@expo/vector-icons';

const Account = () => {
  const [account, setAccount] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await getAccount();
        setAccount(response.data.accounts);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    const fetchReviewProfesionalStar = async () => {
      try {
        const response = await getReviewProfesionalStarRequest();
        setAverageRating(response.data.averageRating || 0);
      } catch (error) {
        console.error('Error fetching professional star rating:', error);
        setAverageRating(0); // Fallback to default
      }
    };
    fetchReviewProfesionalStar();
  }, []);

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Cuenta</Text>
        </View>
        {account.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Deuda y Crédito</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Deuda: {account[0].deuda}</Text>
              <Text style={styles.cardText}>Crédito: {account[0].credito}</Text>
            </View>
          </View>
        )}
        {/* Mostrar las estrellas basadas en averageRating */}
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesome
              key={star}
              name={star <= averageRating ? "star" : "star-o"}
              size={50}
              color={star <= averageRating ? "#ffdd44" : "#a89ec9"}
            />
          ))}
        </View>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#81e6d9',
    fontWeight: 'bold',
    fontSize: 28,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
  },
  cardHeader: {
    backgroundColor: '#2d3748',
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardBody: {
    padding: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2D3748',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
});

export default Account;
