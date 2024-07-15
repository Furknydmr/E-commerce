import { NativeModules } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

import {addOrderHistory} from './CartUtils'




const { PaymentModule } = NativeModules;


export const formatCardNumber = (number: string) => {
  const filteredText = number.replace(/[^0-9]/g, '');
  return filteredText
  };

  export const getExpiryDateForPayment = (date: string) => {
    return date.replace(/\//g, ''); 
  };

  export const formatExpiryDate = (date: string) => {
    const cleaned = date.replace(/\D/g, ''); 
    const month = cleaned.slice(0, 2); 
    const year = cleaned.slice(2, 4);
    return month && year ? `${month}/${year}` : month || '';
  };

  export const formatCardName = (text: string) => {
    return text.replace(/[^a-zA-ZıİiÖöÜüŞşÇç\s]/g, '');
  };

  export const startPayment = (cardNo: String, expDate: String, cvv:String, amount: Double) => {
    return new Promise((resolve, reject) => {
      PaymentModule.startPayment(
        cardNo,
        expDate,
        cvv,
        amount,
        (successMessage: String) => resolve(successMessage),
        (errorMessage: String) => reject(errorMessage)
      );
    });
  };


  export const ConfirmPayment = (otp:string, cardNumber:string, totalAmount:string, navigation:any) => {
    
    if (otp.length === 6) { 
      PaymentModule.confirmPayment(otp,
        
        (successMessage:string) => {
          showToast('Ödeme Başarılı')
          addOrderHistory(cardNumber, totalAmount,navigation); 
        },
        (errorMessage:string) => {
          showToast('Kod Hatalı')
        }
      );
    } else {
      showToast('lütfen gelen 6 basamaklı şifeyi giriniz.')
    }
  }


  export const showToast = (text: string) => {
    
    PaymentModule.showToast(text);
    
  };

