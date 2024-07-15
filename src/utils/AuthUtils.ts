import { 
    Alert,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../utils/PaymentUtils';




export const handleRegister = (
    email:string,password:string,passwordConfirm:string,name:string,phone:string,navigation:any
) => {

    if(password !== passwordConfirm){
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
    }
    else{
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //firestore kayıt işlemleri
      firestore().collection('users').doc(user.uid).set({
        name: name,
        email: email,
        phone: phone,
      })
      .then(()=>{console.log('Kullanıcı bilgileri eklendi');})
      .catch(error =>{console.log('Hata:',error);});

        navigation.navigate('Main');
      
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        showToast('Bu E-mail adresi zaten kullanılıyor!');
      }

      if (error.code === 'auth/invalid-email') {
        showToast('E-mail Geçersiz!');
      }

    console.error(error);
  });
    }
  };
export const handleLogin= (email:string,password:string, navigation:any) =>{
    if (!email || !password) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
        return;
      }
  
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Main')
          showToast('Giriş Başarılı.');
          
  
        })
        .catch(error => {
          showToast('e-posta veya şifre Hatalı.');
        });
}

export const sendPasswordResetEmail= (email:string,navigation:any) => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        showToast('Şifre sıfırlama bağlantısı başarıyla gönderildi.');
        
          navigation.navigate('Welcome');
        
      })
      .catch(error => {
        console.log('Hata Kodu:', error.code);
        Alert.alert('Lütfen girdiğiniz e-posta adresinizi kontrol edin.');
       
      });
  }

export const getUserInfo = async () => {
    const userId = auth().currentUser?.uid;
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log('Kullanıcı bulunamadı!');
      return null;
    }
  } catch (error) {
    console.error('Kullanıcı bilgileri alınamadı!', error);
  }
};

export const updateUserInfo = async ( updatedInfo, navigation:any ) => {
    const userId = auth().currentUser?.uid;
    try {
      await firestore().collection('users').doc(userId).update(updatedInfo);
      showToast('Bilgileriniz Güncellendi');
      navigation.goBack();
    } 
    catch {
      console.log('Kullanıcı bilgileri Güncellenmedi!',);
    
    }
  };

  export const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };