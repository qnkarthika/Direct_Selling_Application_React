import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import HomePage from './components/HomePage';
import Product from './components/Product';
import Detail from './components/Detail';
import Contact from './components/Contact';
import ContactDetailScreen from './screens/ContactDetailScreen';
import DisplayData from './screens/DisplayData.js';
import ContactUs from './components/ContactUs.js';
import Display from './screens/Display.js';

const Stack = createStackNavigator();
export default function App() {
  const [storedFormData, setStoredFormData] = useState(null);
  useEffect(() => {
    retrieveFormData();
  }, []);
  const retrieveFormData = async () => {
    try {
      const formDataString = await AsyncStorage.getItem('formData');
      if (formDataString !== null) {
        const formData = JSON.parse(formDataString);
        setStoredFormData(formData);
      }
    } catch (error) {
      console.error('Error retrieving form data:', error);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="ContactDetails" component={ContactDetailScreen} />
        <Stack.Screen name="DisplayData" component={DisplayData} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Display" component={Display} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
