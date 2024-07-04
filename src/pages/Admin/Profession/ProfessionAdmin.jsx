import React from 'react'
import Navbar from '../../../Components/Navbar'
import { ScrollView, StyleSheet } from 'react-native'

const ProfessionAdmin = () => {
  return (
   <>
   <Navbar/>
    <ScrollView contentContainerStyle={style.container}>

    </ScrollView>
   </>
  )
}

const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#1a202c',
        width: '100%',
        minHeight: '100%',
      },
})

export default ProfessionAdmin
