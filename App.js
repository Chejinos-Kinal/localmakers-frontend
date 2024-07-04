import React from 'react';
import { NativeRouter } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import Router from './Router.jsx';
import { StatusBar } from 'expo-status-bar';
import ImagePicker from 'react-native-image-picker'; // Importa react-native-image-picker

global.ImagePicker = ImagePicker; // Configura ImagePicker globalmente

const App = () => {
  return (
    <>
      <StatusBar style='' />
      <NativeRouter>
        <View style={styles.container}>
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
