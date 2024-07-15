import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Ürün ara..."
      value={value}
      onChangeText={onChangeText}
    />
  );
};
export default SearchInput;

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
});


