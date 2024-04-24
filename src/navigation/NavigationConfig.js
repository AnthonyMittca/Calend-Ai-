// NavigationConfig.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import HomeworkScreen from '../screens/HomeworkScreen';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator();

export default function NavigationConfig() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
        <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: 'Inscription' }} />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Accueil',
            headerLeft: null, // Supprime la flèche de retour pour la page d'accueil
            gestureEnabled: false, // Désactive le geste de retour sur iOS pour HomeScreen
          }} 
        />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ title: 'Calendrier' }} />
        <Stack.Screen name="HomeworkScreen" component={HomeworkScreen} options={{ title: 'Devoirs' }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Compte' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
