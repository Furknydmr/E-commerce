import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
//
import { handleAddToCart } from '../utils/CartUtils';
import { useAppNavigation } from '../navigator/hooks';


const ProductGrid = ({ products }) => {
  const navigation = useAppNavigation();


  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price} TL</Text>
      </View>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item.id, item.name)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

export default ProductGrid;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    maxWidth: '48%',
  },
  imageWrapper: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 10,
    alignItems: 'flex-start',
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    bottom: 5,
    right: 5,  
    position: 'absolute',
    backgroundColor: '#04B1B4',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 170,
  },
});
