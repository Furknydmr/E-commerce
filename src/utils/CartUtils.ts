import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';







export const fetchProductDetails = async () => {
  try {
    
    const cartProductDetails = await getCartProductDetails();

    if (cartProductDetails.length === 0) {
      console.log('Sepette hiç ürün yok.');
      return([]);
    }

    const productDetailsPromises = cartProductDetails.map(async (product) => {
      const productDetail = await getProductDetailsById(product.id);
      return {
        ...productDetail,
        quantity: product.quantity 
      };
    });

    const products = await Promise.all(productDetailsPromises);

    //console.log('Sepetteki ürünlerin detayları:', products);
    return products;
  } catch (error) {
    console.error('Sepet ürün detaylarını alırken bir hata oluştu:', error);
    return [];
  } 
};


export const handleAddToCart = async (productId: string, productName:string): Promise<void> => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    console.error('Kullanıcı oturum açmamış.');
    return; 
  }

  try {
    const cartDocRef = firestore().collection('users').doc(userId).collection('cart').doc(productId);

    
    const docSnapshot = await cartDocRef.get();

    if (docSnapshot.exists) {
      
      const currentData = docSnapshot.data();
      const currentQuantity = currentData?.quantity || '0';
      const newQuantity = (parseInt(currentQuantity) + 1).toString();

      await cartDocRef.update({
        quantity: newQuantity,
      });
      console.log('Miktar güncellendi:', newQuantity);
      
    } else {
      
      await cartDocRef.set({
        productId: productId,
        quantity: '1',
        name: productName,
      });
      console.log('Ürün sepete eklendi');
      
    }
  } catch (error) {
    console.error('Hata:', error);
  }
};

export const reduceFromCart = async (productId: string): Promise<void> => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    console.log('Kullanıcı oturum açmamış.');
    return; 
  }
  //console.log('Kullanıcı ID:', userId);

  try {
    const cartDocRef = firestore().collection('users').doc(userId).collection('cart').doc(productId);

    
    const docSnapshot = await cartDocRef.get();

    if (docSnapshot.exists) {
      const currentData = docSnapshot.data();
      const currentQuantity = parseInt(currentData?.quantity || '0');

      if (currentQuantity > 1) {
        
        await cartDocRef.update({
          quantity: (currentQuantity - 1).toString(),
        });
        //console.log('Miktar azaltıldı:', currentQuantity - 1);
        
      } else {
        
        await cartDocRef.delete();
        //console.log('Ürün sepetten silindi');
      }
      await fetchProductDetails();
    } else {
      console.error('Ürün sepetinde bulunamadı');
    }
    
  } catch  {
    //console.log('Hata:');
  }
};

export const removeFromCart = async (productId:string) =>{
  const userId = auth().currentUser?.uid;
  if (!userId) {
    console.error('Kullanıcı oturum açmamış.');
    return; 
  }
  try {
    await firestore().collection('users').doc(userId).collection('cart').doc(productId).delete();

    console.log('silindi');
  } catch  {
    console.log('Hata:');
  }
}


export const getProductDetailsById = async (productId:string) => {
  try {
    if (!productId) {
      throw new Error('Ürün ID yok.');
    }
    const productDoc = firestore().collection('products').doc(productId);
    const doc = await productDoc.get();
    if (!doc.exists) {
      throw new Error('Ürün bulunamadı.');
    }
    const product = {
      id: doc.id,
      ...doc.data(),
    };
    //console.log('Ürün detayları:', product);
    return product;
  } catch (error) {
    console.error('Ürün detaylarını alırken bir hata oluştu: ', error);
    return null;
  }
};

export const getCartProductDetails = async () => {
  try {
    const userId = auth().currentUser?.uid; 
    if (!userId) {
      throw new Error('Kullanıcı oturum açmamış.');
    }
    
    const cartRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('cart');

    
    const snapshot = await cartRef.get();

    
    const productDetails = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        quantity: data.quantity,
        name: data.name
      };
    });

    //console.log('Sepetteki ürünlerin detayları:', productDetails);
    return productDetails;
  } catch (error) {
    console.error('Ürün detaylarını alırken bir hata oluştu:', error);
    return [];
  }
};

export const addOrderHistory = async (cardNumber:string, totalAmount:string, navigation:any) => {
  const userId = auth().currentUser?.uid;
  const currentDate = new Date().toISOString()
  const cartProductDetails = await getCartProductDetails();

  const date =currentDate.split('T')[0];
  
    firestore().collection('users').doc(userId).collection('orderHistory').doc(currentDate).set({
      dateId: currentDate,
      cardNumber: cardNumber,
      totalAmount: totalAmount,
      productDetails: cartProductDetails,
    })
    .then(async ()=>{
      
        await clearCart(userId)
        navigation.navigate('Confirm', {date,cardNumber,totalAmount})
      }
      
  )
    .catch(error =>{console.log('sepet geçmişine eklenemedi:',error);});
};

export const clearCart = async (userId:string) => {
    
    
    const snapshot = await firestore().collection('users').doc(userId).collection('cart').get();
    

    
    const batch = firestore().batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    
    await batch.commit();
    
   
}

export const getOrderHistory = async () => {
  try{

    const userId = auth().currentUser?.uid;
    if (!userId) {
      throw new Error('Kullanıcı oturum açmamış.');
    }
    const snapshot = await firestore().collection('users').doc(userId).collection('orderHistory').get();

    const orders = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        Date: data.dateId,
        cardNumber: data.cardNumber,
        totalAmount: data.totalAmount,
        productDetails: data.productDetails.map((detail: any) => ({
          productId: detail.id,
          quantity: detail.quantity,
          name: detail.name
        }))
      };
    });
    
    
    return orders;
  } 
  
  catch (error) {
    console.error('Sipariş geçmişi alınamadı:', error);
    return [];
  }

}








  


