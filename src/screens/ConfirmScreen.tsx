import { StyleSheet, Text, View,Button,ScrollView } from 'react-native'
import React from 'react'
//
import { useAppNavigation } from '../navigator/hooks';
import { useRoute } from '@react-navigation/native';

const ConfirmScreen = () => {
  const route = useRoute();
  const { date,cardNumber, totalAmount } = route.params;
  
    const navigation = useAppNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.title}>Ödeme Tamamlandı!</Text>
        <Text style={styles.message}>Siparişiniz başarıyla alındı!</Text>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.subtitle}>Sipariş Detayları</Text>
        <Text style={styles.detail}>Tarih:{date} </Text>
        <Text style={styles.detail}>Kart Numarası: {cardNumber} </Text>
        <Text style={styles.detail}>Toplam Tutar:{totalAmount}₺</Text>
      </View>

      <Button title="Ana Ekrana Dön" onPress={()=>{navigation.navigate('Home')}} />
    </ScrollView>
  )
}

export default ConfirmScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
      },
      messageContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      message: {
        fontSize: 16,
        color: '#333333',
      },
      orderDetails: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      detail: {
        fontSize: 16,
        marginVertical: 4,
      },
})