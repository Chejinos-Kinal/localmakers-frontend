import React from 'react';
import { NativeRouter } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import Navbar from './src/Components/Nabvar.jsx';
import Router from './Router.jsx';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
    <StatusBar style='' />
    <NativeRouter>
      <View style={styles.container}>
        <Navbar />
        <Router />
      </View>
    </NativeRouter>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    
    flex: 1,
  },
});

export default App;
