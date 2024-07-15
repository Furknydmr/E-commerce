import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useAppNavigation } from '../navigator/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { getUserInfo, updateUserInfo } from '../utils/AuthUtils';

const EditProfileScreen = () => {
  const navigation = useAppNavigation();
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getUserInfo();
          setUserInfo({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
          });
        } catch {
          console.log('Kullanıcı bilgileri alınamadı!');
        }
      };
      fetchData();
    }, [])
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={userInfo.email}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={userInfo.phone}
          onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#005f73' : '#008c95' }
          ]}
          onPress={() => updateUserInfo(userInfo, navigation)}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#008c95',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 10,
  },
});
