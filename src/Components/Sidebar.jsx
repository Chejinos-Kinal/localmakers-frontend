import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigate } from 'react-router-native';

const Sidebar = () => {

    const navigate = useNavigate()
    
    const handleExit =()=>{
        AsyncStorage.clear
        navigate('/login')
    }
    
  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity  onPress={()=> navigate('/Account')}  style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>Cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigate('/InformationUser')} style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> handleExit()} style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con transparencia
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Alineación vertical de los elementos
  },
  sidebarButton: {
    backgroundColor: '#1a202c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  sidebarButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Sidebar;
