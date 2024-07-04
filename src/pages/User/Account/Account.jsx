import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Navbar from '../../../Components/Navbar';
import { getAccount } from '../../../services/account.services';



const Account = () => {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await getAccount();
        setAccount(response.data.accounts);
      } catch (error) {
        console.error('Error al ver la cuenta', error);
      }
    };

    fetchAccount();
  }, []);
  console.log(account)

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Cuenta</Text>
        </View>
          <View  style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Deuda y Crédito</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Deuda: </Text>
              <Text style={styles.cardText}>Crédito: </Text>
            </View>
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
});

export default Account;