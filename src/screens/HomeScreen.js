import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue !</Text>
      
      <Button
        title="Calendrier"
        onPress={() => navigation.navigate('CalendarScreen')} 
      />
      
      <Button
        title="Devoirs"
        onPress={() => navigation.navigate('HomeworkScreen')}
      />
      
      <Button
        title="Compte"
        onPress={() => navigation.navigate('AccountScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    marginBottom: 40
  }
});

export default HomeScreen;
