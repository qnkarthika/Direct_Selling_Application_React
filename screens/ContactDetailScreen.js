// ContactDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactDetailsScreen = () => {
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    loadContactDetails();
  }, []);

  const loadContactDetails = async () => {
    try {
      const storedDetails = await AsyncStorage.getItem('contactDetails');
      if (storedDetails !== null) {
        setContactDetails(JSON.parse(storedDetails));
      }
    } catch (error) {
      console.error('Error loading contact details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Details</Text>
      {contactDetails && (
        <View>
          <Text>Consumer Name: {contactDetails.consumerName}</Text>
          <Text>Contact Number: {contactDetails.contactNumber}</Text>
          <Text>Kilograms: {contactDetails.kgs}</Text>
          <Text>Address: {contactDetails.address}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ContactDetailsScreen;
