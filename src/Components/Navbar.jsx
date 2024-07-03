import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'react-router-native';
import Sidebar from './Sidebar'; // Importar el componente Sidebar

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false); // Estado para controlar la visibilidad del Sidebar

  const handlePressUser = () => {
    setShowSidebar(!showSidebar); // Cambiar el estado para mostrar u ocultar el Sidebar
  };

  return (
    <View style={styles.navbarWrapper}>
      <View style={styles.navbarContainer}>
        <Link to="/HomePage" component={TouchableOpacity} style={styles.navItem}>
          <Image source={require('../img/LogoSinNombreSinFondo.png')} style={styles.navImage} />
        </Link>
        
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
