import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation,  } from '@react-navigation/native';
import { UpdateUser } from '../services/user.services';

const Sidebar = () => {
    const navigation = useNavigation();
    const [userRole, setUserRole] = useState('');

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

    const handleExit = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };

    const updateState = async()=>{
        try {
            data= {
              role: 'CLIENT'
            }

            await UpdateUser(data)
            navigation.navigate('Login')
        } catch (error) {``
          console.error(error)
        }
      }

    return (
        <View style={styles.sidebarContainer}>
            {userRole === 'PROFESSIONAL' &&(
                <>
                <TouchableOpacity onPress={() => updateState()} style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Modo Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('UpdateUser')} style={styles.sidebarButton}>
                  <Text style={styles.sidebarButtonText}>Actualizar Datos</Text>
              </TouchableOpacity>
              </>   
            )}
            {userRole === 'CLIENT' &&(
                <>
                <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')} style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Notificaciones</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('UpdateUser')} style={styles.sidebarButton}>
                  <Text style={styles.sidebarButtonText}>Actualizar Datos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('BecomeProfessional')} style={styles.sidebarButton}>
                    <Text style={styles.sidebarButtonText}>Quieres ser un profesional</Text>
                </TouchableOpacity>
            </>
            )}
             <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.sidebarButton}>
                  <Text style={styles.sidebarButtonText}>Cuenta</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={handleExit} style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebarContainer: {
        width: '100%',
        backgroundColor: '#1a202c',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 10,
    },
    sidebarButton: {
        width: '50%',
        borderWidth: 1,
        borderColor: '#38b2ac',
        backgroundColor: '#1a202c',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    sidebarButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Sidebar;
