import { 
  StyleSheet, Text, View, 
  TextInput, Pressable,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useAppNavigation } from '../navigator/hooks';
import { sendPasswordResetEmail } from '../utils/AuthUtils';

const ResetPasswordScreen = () => {
  const navigation = useAppNavigation();

  const [email, setEmail] = useState('');

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Şifrenizi Yenileyin</Text>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        
  
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#333' : '#000' }
          ]}
          onPress={() => sendPasswordResetEmail(email, navigation)}
        >
          <Text style={styles.buttonText}>Şifre Yenileme Linki Gönder</Text>
          
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.forgotPasswordButton,
            { backgroundColor: pressed ? '#444' : '#777' }
          ]}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.forgotPasswordText}>Giriş Sayfası</Text>
        </Pressable>
      </View>
  );
  
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  forgotPasswordButton: {
    marginTop: 10,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 10,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});