import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { reduceFromCart, fetchProductDetails, removeFromCart, handleAddToCart } from '../utils/CartUtils';
import { useFocusEffect } from '@react-navigation/native';
import { useAppNavigation } from '../navigator/hooks';

const ShoppingCart = () => {
  const navigation = useAppNavigation();
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = (products: any[]) => {
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setTotalPrice(total);
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadProductDetails = async () => {
        const products = await fetchProductDetails();
        const updatedProducts = products.map(product => ({
          ...product,
          price: parseFloat(product.price.replace(/[^0-9,]/g, '').replace(',', '.')),
          quantity: parseInt(product.quantity, 10)
        }));
        setProductDetails(updatedProducts);
        calculateTotalPrice(updatedProducts);
      };

      loadProductDetails();
    }, [])
  );

  const useReduceCart = async (productId: string) => {
    await reduceFromCart(productId);
    const products = await fetchProductDetails();
    const updatedProducts = products.map(product => ({
      ...product,
      price: parseFloat(product.price.replace(/[^0-9,]/g, '').replace(',', '.')),
      quantity: parseInt(product.quantity, 10)
    }));
    setProductDetails(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };
  const useAddToCart = async (productId: string, productName:string) => {
    await handleAddToCart(productId, productName);
    const products = await fetchProductDetails();
    const updatedProducts = products.map(product => ({
      ...product,
      price: parseFloat(product.price.replace(/[^0-9,]/g, '').replace(',', '.')),
      quantity: parseInt(product.quantity, 10)
    }));
    setProductDetails(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };
  const useRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
    const products = await fetchProductDetails();
    const updatedProducts = products.map(product => ({
      ...product,
      price: parseFloat(product.price.replace(/[^0-9,]/g, '').replace(',', '.')),
      quantity: parseInt(product.quantity, 10)
    }));
    setProductDetails(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)} TL</Text>
        <Text style={styles.itemQuantity}>Adet: {item.quantity}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.plus}>
          <TouchableOpacity style={styles.button} onPress={() => useAddToCart(item.id, item.name)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => useReduceCart(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => useRemoveFromCart(item.id)}>
            <Text style={styles.buttonText}>Sil</Text>
          </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {productDetails.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sepetiniz boş</Text>
          <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.continueShoppingButtonText}>Alışverişe Devam Et</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={productDetails}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Toplam: {totalPrice.toFixed(2)} TL</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Payment', { totalAmount: totalPrice })}>
              <Text style={styles.checkoutButtonText}>Ödeme Adımına Geç</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
    padding: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#777',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete:{
    backgroundColor: '#E94E77',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#E94E77',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  continueShoppingButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueShoppingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatListContent: {
    flexGrow: 1,
  },
  plus:{
    fontSize:12,
  },
  
});
