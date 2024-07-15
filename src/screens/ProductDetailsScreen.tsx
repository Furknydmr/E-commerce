import {
  View, Text, Image,
  StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '../navigator/hooks';
import firestore from '@react-native-firebase/firestore';
import { handleAddToCart } from '../utils/CartUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = firestore().collection('products').doc(productId);
        const doc = await productRef.get();
        if (doc.exists) {
          setProduct(doc.data());
        } else {
          console.log('Ürün bulunamadı');
        }
      } catch (error) {
        console.error('Ürün verisi alınırken hata oluştu: ', error);
      } finally {
        setLoading(false); // Yükleme işlemini tamamla
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Ürün yükleniyor...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Ürün bulunamadı.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.color}>Renk: {product.color}</Text>
            <Text style={styles.color}>Marka: {product.brand}</Text>
          </View>
          <Text style={styles.price}>{product.price} TL</Text>
        </View>
        <Text style={styles.description}>{product.about}</Text>
        <Text style={styles.productKey}>Ürün Kodu: {product.productKey}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product.id,product.name)}>
          <Text style={styles.buttonText}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 500,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  color: {
    fontSize: 18,
    color: '#555',
    margin:6,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E94E77',
    marginTop: 8,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginVertical: 16,
  },
  productKey: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#E94E77',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEEBEC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#000',
  },
  notFoundText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
  },
});
