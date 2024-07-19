import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../../Components/Navbar';
import { useNavigation } from '@react-navigation/native'; 
import { getAccountAdmin } from '../../../services/account.services';

const AccountAdmin = () => {
  const [accounts, setAccounts] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await getAccountAdmin();
        setAccounts(response.data.foundedAccounts);
      } catch (error) {
        console.error('Error con las cuentas', error);
      }
    }
    fetchAccount();
  }, []);

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        {accounts.map((account, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => navigation.navigate('AccountA', {account})}>
            <View style={styles.containerCard}>
              {account.user ? (
                <>
                  <Text style={styles.textContainerTitle}>
                    {account.user.name} {account.user.surname}
                  </Text>
                  <Text style={styles.textCard}>Crédito: {account.credito}</Text>
                  <Text style={styles.textCard}>Deuda: {account.deuda}</Text>
                </>
              ) : (
                <Text style={styles.textContainerTitle}>Usuario no disponible</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    width: '100%',
    minHeight: '100%',
  },
  containerCard: {
    borderWidth: 1,
    borderColor: '#FFFF',
    backgroundColor: '#2d3748',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  textContainerTitle: {
    color: '#81e6d9',
    fontSize: 15,
  },
  textCard: {
    color: '#FFFF',
    fontSize: 15,
  },
});

export default AccountAdmin;
