import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [user, setUser] = useState(null); // State pour stocker les informations de l'utilisateur

  const navigation = useNavigation();

  const handleLogin = () => {
    const { email, password } = form;
    if (email && password) {
      axios.post('http://10.0.2.2:3000/login', {
        email,
        password,
      })
      .then(response => {
        // Récupérer l'ID de l'utilisateur à partir de la réponse
        const userId = response.data.userId;
        console.log('User ID:', userId); // Log User ID
      
        // Récupérer les informations de l'utilisateur en utilisant l'ID de l'utilisateur
        axios.get(`http://10.0.2.2:3000/loginID/${userId}`)
          .then(response => {
            console.log('User Data:', response.data); // Log User Data
            setUser(response.data);

            // Naviguer vers le ProfilScreen avec les informations utilisateur
            navigation.replace('Main', { screen: 'Profil', params: { user: response.data } });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur:', error.message);
            Alert.alert('Erreur lors de la récupération des informations utilisateur :', error.message);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error.message);
        Alert.alert('Erreur lors de la connexion :', error.message);
      });
    } else {
      Alert.alert('Veuillez fournir un email et un mot de passe.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('./icons/Logo.jpg')} />

            <Text style={styles.title}>
              Sign in to <Text style={{ color: '#075eec' }}>CALENDAI</Text>
            </Text>

            <Text style={styles.subtitle}>
              Accède à ton calendrier perso
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="esgi@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={handleLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

          
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Vous n'avez toujours pas de compte ?{'\n'}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 17,
    fontWeight: '500',
    borderColor: '#e5e7eb',
    borderWidth: 2,
  },
  btn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#075eec',
    borderRadius: 12,
    shadowColor: '#075eec',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  userInfo: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 16,
    alignItems: 'center',
  },
});
