import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { ConfirmPayment, } from '../utils/PaymentUtils';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '../navigator/hooks';

const PaymentConfirmScreen = () => {
  const navigation = useAppNavigation();
    const [otp, setOtp] = useState('');
    const route = useRoute();
    const { cardNumber, totalAmount } = route.params;
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lütfen {totalAmount}TL ödeme için gelen kodu</Text>
      
      <TextInput
        style={styles.input}
        placeholder="buraya giriniz"
        keyboardType="numeric"
        placeholderTextColor="#5C635A"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <Button
        title="Ödemeyi Onayla"
        onPress={() => ConfirmPayment(otp, cardNumber, totalAmount, navigation)}
        color="#007BFF"
      />
    </View>
  )
}

export default PaymentConfirmScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    gap:30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', 
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000000',
  },
  text:{
    fontWeight:'bold',
    fontSize:27,
    marginBottom:20,
    color:'black',
  },
})
