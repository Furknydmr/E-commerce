import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
//
import firestore from '@react-native-firebase/firestore';
import SearchInput from '../components/SearchInput';
import CategoryButtons from '../components/CategoryButtons';
import ProductGrid from '../components/ProductGrid';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await firestore().collection('products').get();
        const productList = productsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch {
        console.log('Veriler alınamadı');
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    (selectedCategory === null || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
      <CategoryButtons
        categories={['Tümü', 'phone', 'shoes', 'laptop', 't-shirt', 'watch']}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default ProductList;
