import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role from AsyncStorage:', error);
      }
    };

    fetchUserRole();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const navigateHome = () => {
    if(userRole === 'ADMIN'){
      navigation.navigate('HomePageAdmin')
    }else{
      navigation.navigate('HomePage')
    }
  };

  return (
    <View style={styles.navbarWrapper}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={navigateHome} style={styles.navItem}>
          <Image source={require('../img/LogoSinNombreSinFondo.png')} style={styles.navImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleSidebar} style={styles.navItem}>
          <Image source={require('../img/User.png')} style={styles.navImage} />
        </TouchableOpacity>
      </View>
      {showSidebar && <Sidebar onClose={toggleSidebar} />}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarWrapper: {
    position: 'relative',
  },
  navbarContainer: {
    backgroundColor: '#6C7C74',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  navItem: {
    height: 70,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Navbar;
