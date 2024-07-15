import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ShoppingCart from '../screens/ShoppingCart';

//button
import CustomHeader from '../components/CustomHeader';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const BattomNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{header: () => <CustomHeader />, tabBarShowLabel: true,
        tabBarIcon: () => null,
        tabBarLabel: ({ focused  }) => (
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: focused ? '#E94E77' : '#000' }]}>
            
            </Text>
          </View>
        ),
        tabBarStyle: {
          height: 60,
          borderTopWidth: 5,
          borderTopColor: '#EAEAEA',
          backgroundColor: '#FFF',
          paddingBottom: 5,
        },
      }}
      
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Ana Sayfa' }} />
        <Tab.Screen name="Cart" component={ShoppingCart} options={{ tabBarLabel: 'Sepet' }}/>
        <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ tabBarLabel: 'Profil' }} />
      </Tab.Navigator>
    );
  }

export default BattomNavigator

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 84,
    fontWeight: 'bold',
  },
});