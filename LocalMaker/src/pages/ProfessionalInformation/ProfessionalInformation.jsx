import React from 'react'
import { View, Text, StyleSheet, Image,Button, TouchableOpacity } from 'react-native'
import { useLocation } from 'react-router-native'
import { useNavigate } from 'react-router-native';
const ProfessionalInformation = () => {
    const location = useLocation()
    const { professional } = location.state
    const navigation = useNavigate()
    const handleMakeWorkOffer = ()=>{
        navigation('/MakeWorkOffer')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{professional.name} {professional.surname}</Text>
            <Image source={{ uri: professional.profilePicture }} style={styles.profilePicture} />
            <Text style={styles.description}>{professional.description}</Text>
            <Text style={styles.contact}>TEL: {professional.phone}</Text>
            <Text style={styles.contact}>Email: {professional.email}</Text>
            <TouchableOpacity>
            <Button title='Realizar oferta de trabajo'onPress={() =>handleMakeWorkOffer()} ></Button>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    contact: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ProfessionalInformation
