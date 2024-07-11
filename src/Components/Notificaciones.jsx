import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getWorkOffertRequest } from '../services/workOffer.services';
import { useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFinalOfferRequest } from '../services/FinalOffer.services';
import { format } from 'date-fns'; // Importa la función de formateo de date-fns

const Notificaciones = () => {
    const [workOffer, setWorkOffer] = useState([]);
    const [finalOffer, setFinalOffer] = useState([]);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const role = await AsyncStorage.getItem('role');
                setUserRole(role);
            } catch (error) {
                console.error('Error fetching user role from AsyncStorage', error);
            }
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        const fetchWorkOffer = async () => {
            try {
                const role = await AsyncStorage.getItem('role');
                if (role === 'PROFESSIONAL') {
                    const response = await getWorkOffertRequest();
                    setWorkOffer(response.data.workoffers || []);
                } else if (role === 'CLIENT') {
                    const response = await getFinalOfferRequest();
                    setFinalOffer(response.data.foundFinalOffer || []);
                }
            } catch (error) {
                console.log('Error al listar los workOfFer', error);
            }
        };
        fetchWorkOffer();
    }, [userRole]); // Asegúrate de que userRole esté en las dependencias

    const handleNavigate = (workOfFer) => {
      
    }


    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy'); // Formatea la fecha a 'dd/MM/yyyy'
    };

    return (
        <>
          <Navbar />
          <ScrollView contentContainerStyle={style.container}>
            <View style={style.headerContainer}>
              <Text style={style.headerText}>Notificaciones</Text>
            </View>
            {userRole === 'PROFESSIONAL' && (
              <View>
                {workOffer.length > 0 ? (
                  workOffer.map((workOfFer, index) => (
                    <TouchableOpacity key={index} onPress={() => navigate('/Notificacion', { state: { workOfFer } })}>
                      <View style={style.containerCard}>
                        <Text style={style.textContainerTitle}>{workOfFer.title}</Text>
                        <Text style={style.textCard}>{workOfFer.problemDescription}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={style.textCard}>No hay ofertas de trabajo disponibles.</Text>
                )}
              </View>
            )}
            {userRole === 'CLIENT' && (
              <View>
                {finalOffer.length > 0 ? (
                  finalOffer.map((finalOffer, index) => (
                    <TouchableOpacity key={index} onPress={() => navigate('/Notificacion', { state: { finalOffer } })}>
                      <View style={style.containerCard}>
                        <Text style={style.textContainerTitle}>{formatDate(finalOffer.workDate)}</Text>
                        <Text style={style.textContainerTitle}>Q.{finalOffer.price}</Text>
                        <Text style={style.textCard}>{finalOffer.workSite}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={style.textCard}>No hay ofertas finales disponibles.</Text>
                )}
              </View>
            )}
          </ScrollView>
        </>
      );
      
};

const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1a202c',
        width: '100%',
        minHeight: '100%',
    },
    headerContainer: {
        paddingTop: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#81e6d9',
        fontWeight: 'bold',
        fontSize: 28,
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
    }
});

export default Notificaciones;
