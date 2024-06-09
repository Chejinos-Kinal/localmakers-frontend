import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'react-router-native';

const Navbar = () => {
  return (
    <View style={styles.navbarContainer}>
      <Link to="/" component={TouchableOpacity} style={styles.navItem}>
        <Image source={require('../img/LogoSinNombreSinFondo.png')} style={styles.navImage} />
      </Link>
      <Link to="/informationProfession" component={TouchableOpacity} style={styles.navItem}>
        <Image source={require('../img/User.png')} style={styles.navImage} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  navImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Navbar;
