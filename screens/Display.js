// Display.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Display = () => {
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
    <View style={styles.container}>
      <Text style={styles.header}>Stored Form Data:</Text>
      {storedFormData && (
        <View style={styles.dataContainer}>
          <Text>Name:       {storedFormData.name}</Text>
          <Text>Email:        {storedFormData.email}</Text>
          <Text>Message:  {storedFormData.message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataContainer: {
    width:250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 500,
  },
});

export default Display;
