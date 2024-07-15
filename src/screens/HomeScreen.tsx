import { StyleSheet, View } from 'react-native'
import React from 'react'
//
import ProductList from '../components/ProductList'


const HomeScreen = () => {


  return (
    
    <View style={styles.container}>
      <ProductList/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e0f7fa',
  },
})