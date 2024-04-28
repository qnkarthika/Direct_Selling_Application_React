// DisplayData.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayData = () => {
  const [contactDetails, setContactDetails] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('contactDetails');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setContactDetails(parsedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const isContactDetailsEmpty = () => {
    return (
      contactDetails.consumerName === '' &&
      contactDetails.contactNumber === '' &&
      contactDetails.kgs === '' &&
      contactDetails.address === ''
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stored Data</Text>
      {Object.keys(contactDetails).length > 0 && !isContactDetailsEmpty() ? (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Name:       {contactDetails.consumerName}</Text>
          <Text style={styles.label}>Contact:    {contactDetails.contactNumber}</Text>
          <Text style={styles.label}>Kg:             {contactDetails.kgs}</Text>
          <Text style={styles.label}>Address:   {contactDetails.address}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>No data yet.</Text>
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
    width: 350,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 150,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  noData: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default DisplayData;
