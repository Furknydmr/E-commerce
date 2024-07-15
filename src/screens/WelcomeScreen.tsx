import { 
    StyleSheet, Text, View, 
    Pressable, TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppNavigation } from '../navigator/hooks';
import { handleLogin } from '../utils/AuthUtils'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';



const WelcomeScreen = () => {
    const navigation = useAppNavigation();
    const isFocused = useIsFocused();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
      if (isFocused) {
        
        setEmail('');
        setPassword('');
      }
    }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      
        <Text style={styles.title}>Hoşgeldiniz</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="#5C635A"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#5C635A"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#333' : '#000' }
          ]}
          onPress={() => handleLogin(email, password, navigation)}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.registerButton,
            { backgroundColor: pressed ? '#333' : '#0056b3' }
          ]}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.forgotPasswordButton,
            { backgroundColor: pressed ? '#444' : '#777' }
          ]}
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}
        >
          <Text style={styles.forgotPasswordText}>Şifre Yenile</Text>
        </Pressable>
      
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
    
    title: {
      fontSize: 30,
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
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 30,
      marginBottom: 10,
      paddingHorizontal: 20,
      fontSize: 17,
      backgroundColor: '#fff',
      color: '#000000',
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
    registerButton: {
      backgroundColor: '#0056b3',
      marginTop:20,
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
