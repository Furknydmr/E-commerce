import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { 
  View, Text, TextInput, 
  Button, StyleSheet, ScrollView,
  Alert,
} from 'react-native';

import { formatCardNumber, formatExpiryDate, formatCardName, startPayment, getExpiryDateForPayment  } from '../utils/PaymentUtils';
import { useAppNavigation } from '../navigator/hooks';

const PaymentScreen = () => {

  const route = useRoute();
  const {totalAmount} = route.params;
  const navigation = useAppNavigation();


  const [cardName , setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    const paymentExpiryDate = getExpiryDateForPayment(expiryDate)
    startPayment(cardNumber, paymentExpiryDate, cvv, parseFloat(totalAmount))
      .then((successMessage) => 
        {
          if (typeof successMessage === 'string') {
            console.log('Success', successMessage);
            navigation.navigate('PaymentConfirm',{ cardNumber, totalAmount });
          } else {
            console.log('Error', 'Unknown success message');
          }
        })
      .catch((errorMessage) => Alert.alert('Error', errorMessage));
  };

  const useFormatCardNumber = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const useExpiryDateChange = (text: string) => {
    setExpiryDate(formatExpiryDate(text));
  };


  const useformatCardName = (text: string)=>{
    setCardName(formatCardName(text));
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Ödeme Sayfası</Text>
      <TextInput
        style={styles.input}
        placeholder="Kart Üzerindeki İsim"
        value={cardName}
        onChangeText={useformatCardName}
      />
      <TextInput
        style={styles.input}
        placeholder="Kart Numarası"
        keyboardType="numeric"
        value={cardNumber}
        maxLength={16}
        onChangeText={useFormatCardNumber}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.lastDate]}
          placeholder="Son Kullanma Tarihi (MM/YY)"
          keyboardType="numeric"
          value={expiryDate}
          maxLength={5}
          onChangeText={useExpiryDateChange}
        />
        <TextInput
          style={[styles.input, styles.cvv]}
          placeholder="CVV"
          keyboardType="numeric"
          maxLength={3}
          value={cvv}
          onChangeText={setCvv}
        />
      </View>
      
    </ScrollView>
      <Text>Ödecenek Tutar: {totalAmount}TL </Text>
      <View style={styles.buttonContainer}>
        <Button title="Ödeme Yap" onPress={handlePayment} />
      </View>
    </View>
  );
};
export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cvv: {
    width: '25%',
  },
  lastDate: {
    width:'70%',
  },
  buttonContainer: {
    padding: 16,
  },
});


