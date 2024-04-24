import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema avec Yup
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Adresse email invalide').required('L’email est requis'),
  password: Yup.string().required('Le mot de passe est requis'),
});

const LoginScreen = ({ navigation }) => {
  // Valeurs codées en dur pour l'exemple
  const hardcodedEmail = 'user@example.com';
  const hardcodedPassword = 'password123';

  const handleLogin = (email, password) => {
    if (email === hardcodedEmail && password === hardcodedPassword) {
      navigation.navigate('Home'); // Naviguer vers Home si les identifiants sont corrects
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects'); // Afficher une alerte si les identifiants sont incorrects
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => handleLogin(values.email, values.password)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            name="email"
            placeholder="Email"
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {(touched.email && errors.email) && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            name="password"
            placeholder="Mot de passe"
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            autoCapitalize="none"
          />
          {(touched.password && errors.password) && <Text style={styles.errorText}>{errors.password}</Text>}
          <Button title="Se connecter" onPress={handleSubmit} />
          <Button
            title="Pas de compte ? Inscrivez-vous"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default LoginScreen;