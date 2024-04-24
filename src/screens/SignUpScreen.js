import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email('Adresse email invalide').required('L’email est requis'),
  password: Yup.string().required('Le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('La confirmation du mot de passe est requise'),
});

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={signUpValidationSchema}
        onSubmit={values => {
          // Ici, intégrez la logique pour s'inscrire
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Mot de passe"
              secureTextEntry
            />
            {touched.password && errors.password && <Text>{errors.password}</Text>}
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Confirmez le mot de passe"
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}
            <Button onPress={handleSubmit} title="S'inscrire" />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpScreen;