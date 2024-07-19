import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import HomePage from './src/pages/User/HomePages/HomePage';
import ProfessionalInformation from './src/pages/User/ProfessionalInformation/ProfessionalInformation';
import Login from './src/pages/User/UserPage/Login';
import Register from './src/pages/User/UserPage/Register';
import MakeWorkOffer from './src/pages/User/WorkOffer/MakeWorkOffer';
import Information from './src/pages/User/UserPage/Information';
import Review from './src/pages/User/Review/Review';
import UpdateUser from './src/pages/User/UserPage/UpdateUser';
import Account from './src/pages/User/Account/Account';
import ChatRoom from './src/Components/ChatRoom';
import HomePageAdmin from './src/pages/Admin/HomePage/HomePageAdmin';
import ProfessionAdmin from './src/pages/Admin/Profession/ProfessionAdmin';
import BecomeProfessional from './src/pages/User/BecomeProfessional/BecomeProfessional';
import RegisterAdmin from './src/pages/Admin/RegisterAdminPage/RegisterAdmin';
import Notificaciones from './src/Components/Notificaciones';
import Notificacion from './src/Components/Notificacion';
import FinalOffer from './src/pages/Profesional/FinalOffer/FinalOffer';
import ConfirmRegister from './src/Components/ConfirmRegister';
import MetodoDePago from './src/Components/MetodoDePago';
import ConfirmacionDeTrabajo from './src/Components/ConfirmacionDeTrabajo';
import ReviewAdmin from './src/pages/Admin/Review/ReviewAdmin';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ProfessionalInformation" component={ProfessionalInformation} />
          <Stack.Screen name="MakeWorkOffer" component={MakeWorkOffer} />
          <Stack.Screen name="UpdateUser" component={UpdateUser} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="HomePageAdmin" component={HomePageAdmin} />
          <Stack.Screen name="ProfessionAdmin" component={ProfessionAdmin} />
          <Stack.Screen name="BecomeProfessional" component={BecomeProfessional} />
          <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
          <Stack.Screen name="Notificaciones" component={Notificaciones} />
          <Stack.Screen name="Notificacion" component={Notificacion} />
          <Stack.Screen name="FinalOffer" component={FinalOffer} />
          <Stack.Screen name="ConfirmRegister" component={ConfirmRegister} />
          <Stack.Screen name="MetodoDePago" component={MetodoDePago} />
          <Stack.Screen name="ConfirmacionDeTrabajo" component={ConfirmacionDeTrabajo} />
          <Stack.Screen name='ReviewAdmin' component={ReviewAdmin}/>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
