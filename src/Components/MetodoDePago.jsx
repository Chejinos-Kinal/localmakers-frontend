import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Navbar from './Navbar'
import { Picker } from '@react-native-picker/picker'
import { useNavigation, useRoute } from '@react-navigation/native';
import { newTransactionRequest } from '../services/transaction.services'

const MetodoDePago = () => {
  const route = useRoute();
  const { finalOffer } =  route.params
 const navigation = useNavigation()
  const [selectedValue, setSelectedValue] = useState('')
  const [values, setValues] = useState({
    finalOffer: finalOffer._id,
    user: finalOffer.user,
    professional: finalOffer.professional._id,
    paymentMethod: 'EFECTIVO'
  })

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue)
    setValues({
      ...values,
      paymentMethod: itemValue
    })
  }

const newTransaction = async(values)=>{
    try {
         await newTransactionRequest(values)
         navigation.navigate('HomePage')
    } catch (error) {
        console.error(error)
    }
}
  return (
    <>
      <Navbar/>
      <View style={styles.container}>
        <View style={styles.profileContainer}> 
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.picker}
          >
            <Picker.Item label="Efectivo" value="EFECTIVO" />
            <Picker.Item label="VISA" value="VISA" />
            <Picker.Item label="MASTERCARD" value="MASTERCARD" />
            <Picker.Item label="AMERICAN EXPRESS" value="AMERICAN EXPRESS" />
          </Picker>
        </View>
        <View style={styles.containerButton}>
        <TouchableOpacity style={styles.cardButton} onPress={() => newTransaction(values)}>
              <Text style={styles.cardButtonText}>Aceptar</Text>
            </TouchableOpacity>
        </View>
      </View>
      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    alignItems: 'center',
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
  picker: {
    backgroundColor: '#4a5568',
    borderRadius: 5,
    width: '100%',
  }, containerButton: {
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

})

export default MetodoDePago
