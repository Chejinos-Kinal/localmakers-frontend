import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navbar from './Navbar'
import { useLocation } from 'react-router-native'

const Notificacion = () => {
    const location = useLocation()
    const {workOfFer} = location.state

    return (
        <>
          <Navbar />
          <View style={styles.container}>
            <View style={styles.profileContainer}>
            <Text style={styles.name}>Titulo</Text>
              <Text style={styles.name}>{workOfFer.title}</Text>
              <Text style={styles.description}>Descripción: {workOfFer.problemDescription}</Text>
              <Text style={styles.contact}>Ubicación: {workOfFer.workSite}</Text>
            </View>
          </View>
        </>
      );
    };
    
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
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#81e6d9',
        marginBottom: 10,
      },
      description: {
        paddingTop:25,
        fontSize: 16,
        color: '#81e6d9',
        marginBottom: 10,
        textAlign: 'center',
      },
      contact: {
        paddingTop:15,
        fontSize: 16,
        color: '#81e6d9',
        marginBottom: 5,
      },
    });
export default Notificacion
