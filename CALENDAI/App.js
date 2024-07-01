import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login'; // Assurez-vous que le chemin est correct
import AgendaScreen from './AgendaScreen'; // Assurez-vous que le chemin est correct
import DevoirScreen from './DevoirScreen'; // Chemin vers votre fichier DevoirScreen.js
import ProfilScreen from './ProfilScreen'; // Chemin vers votre fichier ProfilScreen.js

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Création du stack navigator pour gérer l'authentification
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
    </Stack.Navigator>
  );
}

// Création du drawer navigator pour les écrans principaux
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