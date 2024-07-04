import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navbar from '../../../Components/Navbar'

const Information = () => {
  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#1a202c',
      paddingLeft:20,
      paddingVertical: 20,
    },
  })

  return (
    <>
      <Navbar />
      <View style={style.container}>
      <Text>Hoa</Text>
      </View>
      
    </>
  )
}

export default Information
