// DataStorage.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataStorage = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      const dataToSave = { message: 'Hello, AsyncStorage!' };
      await AsyncStorage.setItem('contactDetails', JSON.stringify(dataToSave));
      console.log('Data saved successfully:', dataToSave);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('contactDetails');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
        console.log('Data loaded successfully:', parsedData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{data.message}</Text>
      <Button title="Save Data" onPress={saveData} />
      <Text>Loaded Data: {JSON.stringify(data)}</Text>
    </View>
  );
};

export default DataStorage;
