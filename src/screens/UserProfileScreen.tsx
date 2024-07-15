import { StyleSheet, Text, View, Pressable,ActivityIndicator, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useAppNavigation } from '../navigator/hooks'
import { useFocusEffect } from '@react-navigation/native';
import { getUserInfo, signOut } from '../utils/AuthUtils'

const UserProfileScreen = () => {
  const navigation = useAppNavigation();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getUserInfo();
          setUserInfo(data);
        } catch  {
          
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Kullanıcı Bilgilerim</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>İsim Soyisim:</Text>
          <Text style={styles.value}>{userInfo.name || 'belirtilmemiş'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userInfo.email || 'belirtilmemiş'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.value}>{userInfo.phone || 'belirtilmemiş'}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0056b3' : '#667C87' },
          ]}
          onPress={() => {
            navigation.navigate('UserEdit');
          }}
        >
          <Text style={styles.buttonText}>Bilgilerimi Düzenle</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0056b3' : '#007bff' },
          ]}
          onPress={() => {
            navigation.navigate('OrderHistory');
          }}
        >
          <Text style={styles.buttonText}>Siparişlerim</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#333' : '#000' },
          ]}
          onPress={() => signOut()}
        >
          <Text style={styles.buttonText}>Oturumu Kapat</Text>
        </Pressable>
        
      </View>
    </ScrollView>
  );
}

export default UserProfileScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});