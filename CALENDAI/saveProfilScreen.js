import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import de useNavigation

export default function ProfilScreen() {
  const [showMygesForm, setShowMygesForm] = useState(false);
  const [mygesEmail, setMygesEmail] = useState('');
  const [mygesPassword, setMygesPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation(); // Hook pour la navigation

  const route = useRoute();
  const { user } = route.params;

  const handleMygesLogin = () => {
    // Simulation d'une connexion réussie
    setIsLoggedIn(true);
    setShowMygesForm(false);
    Alert.alert('Connexion réussie!', 'Vous êtes connecté à Myges.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir vous déconnecter de MyGes ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Se déconnecter de MyGes',
          onPress: () => {
            setIsLoggedIn(false);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleCalendaiLogout = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir vous déconnecter de CalendAI ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Se déconnecter',
          onPress: () => {
            console.log('Déconnexion de CalendAI');
            navigation.navigate('Login'); // Redirection vers la page de connexion après déconnexion de CalendAI
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleDeleteCalendaiAccount = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer votre compte CalendAI ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Supprimer le compte',
          onPress: () => console.log('Suppression du compte CalendAI')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          
          <View style={styles.userInfo}>
            <Text style={styles.profileName}>Bienvenue {user.firstName} !</Text>
          </View>
          
        </View>

        <ScrollView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Myges</Text>
            {isLoggedIn ? (
              <View>
                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                  <Text style={styles.buttonText}>Se déconnecter de MyGes</Text>
                </TouchableOpacity>
              </View>
            ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => setShowMygesForm(!showMygesForm)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>
                      {showMygesForm ? 'Annuler la connexion' : 'Connectez-vous à Myges'}
                    </Text>
                  </TouchableOpacity>

                  {showMygesForm && (
                    <View style={styles.mygesForm}>
                      <TextInput
                        style={styles.mygesInput}
                        placeholder="Email"
                        value={mygesEmail}
                        onChangeText={setMygesEmail}
                      />
                      <TextInput
                        style={styles.mygesInput}
                        placeholder="Mot de passe"
                        secureTextEntry
                        value={mygesPassword}
                        onChangeText={setMygesPassword}
                      />
                      <TouchableOpacity
                        onPress={handleMygesLogin}
                        style={styles.mygesButton}
                      >
                        <Text style={styles.mygesButtonText}>Se connecter</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CalendAI</Text>
            <TouchableOpacity onPress={handleCalendaiLogout} style={styles.button}>
              <Text style={styles.buttonText}>Se déconnecter de CalendAI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteCalendaiAccount} style={[styles.button, styles.deleteButton]}>
              <Text style={styles.buttonText}>Supprimer le compte CalendAI</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    alignItems: 'center',
    padding: 24,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 4,
  },
  profileAction: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    backgroundColor: '#32c759',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 32, // Taille du texte augmentée
    fontWeight: 'bold', // Texte en gras
    color: '#1D2A32',
    marginTop: 16, // Espacement augmenté
    marginBottom: 16, // Espacement augmenté
  },
  connectedText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16, // Espacement augmenté
    marginBottom: 16, // Espacement augmenté
  },
  profileAddress: {
    fontSize: 16,
    fontWeight: '400',
    color: '#929292',
    marginTop: 8,
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007afe',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f', // Fond rouge pour le bouton de suppression
  },
  mygesForm: {
    padding: 24,
    paddingTop: 0,
  },
  mygesInput: {
    height: 50,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  mygesButton: {
    height: 50,
    backgroundColor: '#007afe',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mygesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 32, // Augmenter l'espace entre les éléments
    marginBottom: 24, // Augmenter l'espace entre les éléments
  },
});
