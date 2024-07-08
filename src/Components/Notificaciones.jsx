import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getWorkOffertRequest } from '../services/workOffer.services'
import { useNavigate } from 'react-router-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Notificaciones = () => {
    const [workOffer, setWorkOffer] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchWorkOffer = async () => {
            try {
                const role = await AsyncStorage.getItem('role')
                if(role === 'PROFESSIONAL'){
                    const response = await getWorkOffertRequest()
                    setWorkOffer(response.data.workoffers)
                }else if(role === 'CLIENT'){

                }
            } catch (error) {
                console.log('Error al listar los workOfFer', error)
            }
        }
        fetchWorkOffer()
    }, [])
        
    const handleNavigate =(workOfFer)=>{
        navigate('/Notificacion', {state: {workOfFer}})
    }


    return (
        <>
            <Navbar />
            <ScrollView contentContainerStyle={style.container} >
                <View style={style.headerContainer}>
                    <Text style={style.headerText}>Notificaciones</Text>
                </View>
                {workOffer.map((workOffer, index) => (
                    <TouchableOpacity key={index} onPress={()=> handleNavigate(workOffer)}>
                    <View  style={style.containerCard}>
                        <Text style={style.textContainerTitle} >{workOffer.title}</Text>
                        <Text style={style.textCard}>{workOffer.problemDescription}</Text>
                    </View>
                    </TouchableOpacity>
                ))

                }
            </ScrollView>
        </>

    )
}

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


}

)
export default Notificaciones
