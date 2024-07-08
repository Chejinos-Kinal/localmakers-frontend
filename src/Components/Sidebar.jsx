import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigate } from 'react-router-native';

const Sidebar = () => {
    const navigate = useNavigate();
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
        navigate('/login');
    };

    return (
        <View style={styles.sidebarContainer}>
            {userRole === 'CLIENT' &&(
                <TouchableOpacity onPress={() => navigate('/Notificaciones')} style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Notificaciones</Text>
            </TouchableOpacity>
            )}
            {userRole === 'CLIENT' && (
                  <TouchableOpacity onPress={() => navigate('/Account')} style={styles.sidebarButton}>
                  <Text style={styles.sidebarButtonText}>Cuenta</Text>
              </TouchableOpacity>
            )}
            {userRole === 'CLIENT' && (
                  <TouchableOpacity onPress={() => navigate('/InformationUser')} style={styles.sidebarButton}>
                  <Text style={styles.sidebarButtonText}>Actualizar Datos</Text>
              </TouchableOpacity>
            )}
            {userRole === 'CLIENT' && (
                <TouchableOpacity onPress={() => navigate('/BecomeProfessinal')} style={styles.sidebarButton}>
                    <Text style={styles.sidebarButtonText}>Quieres ser un profesional</Text>
                </TouchableOpacity>
            )}
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
