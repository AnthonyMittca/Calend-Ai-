import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import SignUp from './SignUp';
import AgendaScreen from './AgendaScreen'; // Assurez-vous que le chemin est correct
import DevoirScreen from './DevoirScreen'; // Assurez-vous que le chemin est correct
import ProfilScreen from './ProfilScreen'; // Assurez-vous que le chemin est correct

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Main" 
        component={MainDrawer} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Agenda">
      <Drawer.Screen name="Agenda" component={AgendaScreen} />
      <Drawer.Screen name="Devoir" component={DevoirScreen} />
      <Drawer.Screen name="Profil" component={ProfilScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
