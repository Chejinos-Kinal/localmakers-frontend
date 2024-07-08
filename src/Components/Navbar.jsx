import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userRole, setUserRole] = useState(null);
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

  const handlePressUser = () => {
    setShowSidebar(!showSidebar);
  };

  const handlePressHome = () => {
    if (userRole === 'ADMIN') {
      navigate('/HomePageAdmin');
    } else {
      navigate('/HomePage');
    }
  };

  return (
    <View style={styles.navbarWrapper}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={handlePressHome} style={styles.navItem}>
          <Image source={require('../img/LogoSinNombreSinFondo.png')} style={styles.navImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressUser} style={styles.navItem}>
          <Image source={require('../img/User.png')} style={styles.navImage} />
        </TouchableOpacity>
      </View>
      {showSidebar && <Sidebar />}
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
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '30%',
    backgroundColor: '#6C7C74',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  navImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Navbar;
