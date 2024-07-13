import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getWorkOffertRequest } from '../services/workOffer.services';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFinalOfferRequest } from '../services/FinalOffer.services';
import { format } from 'date-fns';
import { getTransactionClient, getTransactionProfesional } from '../services/transaction.services';

const Notificaciones = () => {
    const [workOffer, setWorkOffer] = useState([]);
    const [finalOffer, setFinalOffer] = useState([]);
    const [TransaccionProfesional, setTransaccionProfesional] = useState([])
    const [userRole, setUserRole] = useState('');
    const [view, setView] = useState(''); // Estado para controlar la vista actual
    const navigation = useNavigation();

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
                    const responseData  = await getTransactionProfesional()
                      setTransaccionProfesional(responseData.data.foundedTrans)
                } else if (role === 'CLIENT') {
                    const response = await getFinalOfferRequest();
                    setFinalOffer(response.data.foundFinalOffer || []);
                    const responseData = await getTransactionClient()
                    setTransaccionProfesional(responseData.data.foundedTrans)
                }
            } catch (error) {
                console.log('Error al listar los workOffer', error);
            }
        };
        fetchWorkOffer();
    }, [userRole]);
    console.log(TransaccionProfesional)

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
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
                      <View style={style.containerButton}>
                            <TouchableOpacity style={style.cardButton} onPress={() => setView('workOffers')}>
                                <Text style={style.cardButtonText}>Ofertas de trabajo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.cardButton} onPress={() => setView('TrabajosRealizando')}>
                                <Text style={style.cardButtonText}>Trabajos que se están realizando</Text>
                            </TouchableOpacity>
                        </View>
                        {view === 'workOffers' && (
                            <View>
                                {workOffer.length > 0 ? (
                                    workOffer.map((workOfFer, index) => (
                                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Notificacion',{ workOfFer } )}>
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
                         {view === 'TrabajosRealizando' && (
                            <View>
                                 {TransaccionProfesional.length > 0 ? (
                                    TransaccionProfesional.map((TransaccionProfesional, index) => (
                                        <TouchableOpacity key={index}  onPress={() => navigation.navigate('ConfirmacionDeTrabajo' )}>
                                            <View style={style.containerCard}>
                                                <Text style={style.textContainerTitle}> Usuario: {TransaccionProfesional.user.name}</Text>
                                                <Text style={style.textCard}>Lugar: {TransaccionProfesional.finalOffer.workSite}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={style.textCard}>No hay trabajos por el momento.</Text>
                                )}
                            </View>
                        )}
                    </View>
                )}
                {userRole === 'CLIENT' && (
                    <View>
                        <View style={style.containerButton}>
                            <TouchableOpacity style={style.cardButton} onPress={() => setView('finalOffers')}>
                                <Text style={style.cardButtonText}>Ofertas finales</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.cardButton} onPress={() => setView('TrabajosRealizando')}>
                                <Text style={style.cardButtonText}>Trabajos que se están realizando</Text>
                            </TouchableOpacity>
                        </View>

                        {view === 'finalOffers' && (
                            <View>
                                {finalOffer.length > 0 ? (
                                    finalOffer.map((finalOffer, index) => (
                                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Notificacion',{ finalOffer } )}>
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

                        {view === 'TrabajosRealizando' && (
                            <View>
                            {TransaccionProfesional.length > 0 ? (
                               TransaccionProfesional.map((TransaccionProfesional, index) => (
                                   <TouchableOpacity key={index}  onPress={() =>navigation.navigate('ConfirmacionDeTrabajo' )}>
                                       <View style={style.containerCard}>
                                           <Text style={style.textContainerTitle}> Usuario: {TransaccionProfesional.professional.name}</Text>
                                           <Text style={style.textCard}>Lugar: {TransaccionProfesional.finalOffer.workSite}</Text>
                                       </View>
                                   </TouchableOpacity>
                               ))
                           ) : (
                               <Text style={style.textCard}>No hay trabajos por el momento.</Text>
                           )}
                       </View>
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

export default Notificaciones;
