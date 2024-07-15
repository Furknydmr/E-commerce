import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//
import { getOrderHistory } from '../utils/CartUtils';
import { useFocusEffect } from '@react-navigation/native';


const OrderHistoryGrid = () => {
  const [orders, setOrders] = useState([]);

  useFocusEffect (React.useCallback(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrderHistory();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []));

  const renderProductDetails = (productDetails) => {
    return productDetails.map((product, index) => (
      <View key={index} style={styles.productContainer}>
        <Text style={styles.itemText}>Ürün: {product.name}</Text>
        <Text style={styles.itemText}>Adet: {product.quantity}</Text>
      </View>
    ));
  };
  
  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };
  
  const renderMainItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{formatDate(item.Date)}</Text>
        <Text style={styles.price}>{item.totalAmount} TL</Text>
        {renderProductDetails(item.productDetails)}
      </View>
    </TouchableOpacity>
  );
  

  return (
    
    <FlatList
      data={orders}
      renderItem={renderMainItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default OrderHistoryGrid

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 12,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  productContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 18,
    color: '#ff5722',
    marginVertical: 10,
  },
});

