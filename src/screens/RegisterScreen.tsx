import { 
  StyleSheet, Text, View, 
  Pressable, ScrollView,
  TextInput,
} from 'react-native'
import React, { useState } from 'react'
import { useAppNavigation } from '../navigator/hooks'; 
import { handleRegister } from '../utils/AuthUtils';

const RegisterScreen = () => {
  const navigation = useAppNavigation();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');


  const useHanleRegister = () => {
    handleRegister(email,password,passwordConfirm,name,phone,navigation);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          placeholderTextColor="#5C635A"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Şifre Onayı"
          placeholderTextColor="#5C635A"
          secureTextEntry
          onChangeText={(text) => setPasswordConfirm(text)}
          value={passwordConfirm}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telefon"
          placeholderTextColor="#5C635A"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adres"
          placeholderTextColor="#5C635A"
          onChangeText={(text) => setAdress(text)}
          value={adress}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#333' : '#000' }
        ]}
        onPress={useHanleRegister}
      >
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.linkButton,
          { backgroundColor: pressed ? '#333' : '#0056b3' }
        ]}
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      >
        <Text style={styles.linkButtonText}>Geri Dön</Text>
      </Pressable>
      
    </ScrollView>
    
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 15,
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
  linkButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#0056b3',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
