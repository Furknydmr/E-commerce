import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButtons = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.buttonScroll}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedCategory === category && styles.selectedButton
          ]}
          onPress={() => onSelectCategory(category === 'Tümü' ? null : category)}
        >
          <Text style={[
            styles.buttonText,
            selectedCategory === category && styles.selectedButtonText
          ]}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  buttonScroll: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 8, 
    paddingHorizontal: 2, 
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',  
    justifyContent: 'center',
    minWidth: 70, 
    height: 40,   
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedButton: {
    backgroundColor: '#AEEBEC',  
  },
  selectedButtonText: {
    color: '#fff',  
  },
});

