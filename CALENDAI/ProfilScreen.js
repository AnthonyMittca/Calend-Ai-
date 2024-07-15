import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  TextInput,
  Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function ProfilScreen() {

  const [showMygesForm, setShowMygesForm] = useState(false);
  const [mygesEmail, setMygesEmail] = useState('');
  const [mygesPassword, setMygesPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMygesLogin = () => {
    console.log('Tentative de connexion avec:', {
      email: mygesEmail,
      mot_de_passe: mygesPassword
    });
  
    axios.post('http://10.0.2.2:3001/login-myges', {
      email: mygesEmail,
      mot_de_passe: mygesPassword
    })
    .then(response => {
      Alert.alert('Connexion réussie!', response.data.message);
      setIsLoggedIn(true);
      setShowMygesForm(false);
    })
    .catch(error => {
      if (error.response) {
        console.error('Réponse serveur:', error.response.data);
        Alert.alert('Erreur', error.response.data.error || 'Erreur lors de la connexion.');
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
        Alert.alert('Erreur', 'Aucune réponse reçue du serveur.');
      } else {
        console.error('Erreur dans la requête:', error.message);
        Alert.alert('Erreur', 'Erreur lors de la connexion.');
      }
    });
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        { 
          text: 'Se déconnecter', 
          onPress: () => setIsLoggedIn(false)
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={require('./icons/leo.jpg')}
                style={styles.profileAvatar}
              />
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>Leo ROBINAND</Text>
            <Text style={styles.profileAddress}>
              123 Maple Street. Anytown, PA 17101
            </Text>
          </View>
        </View>

        <ScrollView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Myges</Text>
            {isLoggedIn ? (
              <View>
                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                  <Text style={styles.buttonText}>Se déconnecter</Text>
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
    fontSize: 24,
    fontWeight: '600',
    color: '#1D2A32',
    marginTop: 16,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: 16,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2A32',
  },
  rowSpacer: {
    flex: 1,
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
});
