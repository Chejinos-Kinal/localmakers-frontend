import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Input from '../../../Components/Input';
import { dataUserRequest, UpdateUser } from '../../../services/user.services';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../../Components/Navbar';

const UpdateUsers = () => {
    const [user, setUser] = useState(null);
    const [isUpdateProfessionsButtonEnabled, setIsUpdateProfessionsButtonEnabled] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await dataUserRequest();
                setUser(response.data.foundedData);
                setIsUpdateProfessionsButtonEnabled(response.data.foundedData.profession?.length > 1);
            } catch (error) {
                console.error('Error al ver los datos del usuario', error);
            }
        };
        fetchUserData();
    }, []);

    const Actualizar = async (values) => {
        try {
            const response = await UpdateUser(values);

            if (response.error) {
                console.error('Error en la actualización:', response.err);
                // You might want to show an error message to the user here
            } else {
                navigation.navigate('HomePage');
            }
        } catch (error) {
            console.error('Error al actualizar el usuario', error);
        }
    };

    if (!user) return <Text>Cargando...</Text>; // Loading state

    return (
        <>
            <Navbar />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.title}>Mi Perfil</Text>
                    <Text style={styles.subtitle}>Actualiza o elimina tu cuenta</Text>
                    <Formik
                        initialValues={{
                            name: user.name || '',
                            surname: user.surname || '',
                            email: user.email || '',
                            username: user.username || '',
                            password: '',
                            passwordConfirm: '',
                            phone: user.phone || '',
                            locality: user.locality || '',
                        }}
                        onSubmit={(values) => Actualizar(values)}
                    >
                        {({ handleSubmit }) => (
                            <View style={styles.form}>
                                <Input
                                    placeholder={user.username}
                                    name='username'
                                    style={styles.input}
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder={user.email}
                                    name='email'
                                    style={styles.input}
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder='Password'
                                    name='password'
                                    style={styles.input}
                                    secureTextEntry
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder='Confirmar Password'
                                    name='passwordConfirm'
                                    style={styles.input}
                                    secureTextEntry
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder={user.name}
                                    name='name'
                                    style={styles.input}
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder={user.surname}
                                    name='surname'
                                    style={styles.input}
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder={user.phone}
                                    name='phone'
                                    style={styles.input}
                                    placeholderTextColor="#000"
                                />
                                <Input
                                    placeholder={user.locality}
                                    name='locality'
                                    style={styles.input}
                                    placeholderTextColor="#000"
                                />
                                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                    <Text style={styles.buttonText}>Actualizar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.button, !isUpdateProfessionsButtonEnabled && styles.buttonDisabled]} 
                                    disabled={!isUpdateProfessionsButtonEnabled}
                                    onPress={()=> navigation.navigate("UpdateProfessions")}
                                >
                                    <Text style={styles.buttonText}>Actualizar mis profesiones</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a202c',
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    form: {
        width: '100%',
        backgroundColor: '#ffff',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#000',
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#00ff00',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default UpdateUsers;
