import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const  { width } = Dimensions.get('window');

const Activate = () => {

    const style = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: '#1a202c',
            paddingLeft:10,
            paddingRight: 10,
            paddingVertical:20,
        },
        subheading: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#81e6d9',
          textAlign: width > 600 ? 'left' : 'center',
        },
    })

  return (
    <View style={style.container}> 
        <Text style={style.subheading} >Activate</Text>
    </View>
  )
}

export default Activate
