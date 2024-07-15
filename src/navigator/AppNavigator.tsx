import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

//BattomNavigation Screens
import BattomNavigator from './BattomNavigator'
//Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentConfirmScreen from '../screens/PaymentConfirmScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import UserEditInfoScreen from '../screens/UserEditInfoScreen'


export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  ResetPassword: undefined;
  Main: undefined;
  Home: undefined;
  ProductDetails: undefined;
  Payment: undefined;
  PaymentConfirm:undefined;
  OrderHistory:undefined;
  Confirm:undefined;
  UserEdit:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle:''}}>
        {user ? (
          
          <Stack.Screen name="Main" component={BattomNavigator} options={{ headerShown: false }} />
        ) : (
          
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}  />
            <Stack.Screen name="Payment" component={PaymentScreen}  />
            <Stack.Screen name="PaymentConfirm" component={PaymentConfirmScreen}  />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen}  />
            <Stack.Screen name="Confirm" component={ConfirmScreen}  />
            <Stack.Screen name="UserEdit" component={UserEditInfoScreen}  />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
