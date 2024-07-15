import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#AEEBEC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
