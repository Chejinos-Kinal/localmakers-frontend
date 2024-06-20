import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

const Navbar = () => {
  const [showRedDot, setShowRedDot] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handlePressMessage = () => {
    setShowRedDot(!showRedDot);
    setShowSidebar(!showSidebar);
  };

  return (
    <View style={styles.navbarContainer}>
      <Link to="/HomePage" component={TouchableOpacity} style={styles.navItem}>
        <Image source={require('../img/LogoSinNombreSinFondo.png')} style={styles.navImage} />
      </Link>
      <TouchableOpacity onPress={handlePressMessage} style={styles.navItem}>
        <Image source={require('../img/Notificacion.png')} style={styles.navImage} />
        {showRedDot && <View style={styles.redDot} />}
      </TouchableOpacity>
      {showSidebar && (
        <Text></Text>
      )}
      <Link to="/InformationUser" component={TouchableOpacity} style={styles.navItem}>
        <Image source={require('../img/User.png')} style={styles.navImage} />
      </Link>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const isDesktop = screenWidth > 800;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarContainer: {
    backgroundColor: '#6C7C74',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  redDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'red',
    position: 'absolute',
    top: isDesktop ? 12 : 12, 
    right: isDesktop ? 265 : 30, 
  },
});

export default Navbar;
