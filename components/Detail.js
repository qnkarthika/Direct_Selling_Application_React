//Detail.jsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {
  const { productId } = route.params;
  const navigation = useNavigation();

  
  const producers = [
    { id: 1, name: ' Leon', price: '₹15', kilograms: '10 kg' ,contact:"7834094587"},
    { id: 2, name: ' Noah', price: '₹12', kilograms: '15 kg',contact:"1234567890" },
    { id: 3, name: 'Oliver', price: '₹13', kilograms: '20 kg',contact:"9876543210" },
    { id: 4, name: 'Elijah', price: '₹15', kilograms: '50 kg' ,contact:"9078563412"},
    { id: 5, name: 'William', price: '₹18', kilograms: '40 kg' ,contact:"67098423783"},
    { id: 6, name: 'James', price: '₹10', kilograms: '20 kg',contact:"9056239713" },
    { id: 7, name: 'Benjamin', price: '₹20', kilograms: '10 kg' ,contact:"6745239078"},
    { id: 8, name: 'Lucas', price: '₹10', kilograms: '10 kg',contact:"1256895634" },
    { id: 9, name: 'Henry', price: '₹13', kilograms: '12 kg',contact:"9078672389" },
    { id: 10, name: 'Alexander', price: '₹20', kilograms: '15 kg',contact:"7834094587" },

   
  ];

  const handleContactProducer = (producerId) => {
    navigation.navigate('Contact', { producers });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Producers</Text>
      

      <ScrollView contentContainerStyle={styles.scrollView}>
        {producers.map(producer => (
          <View key={producer.id} style={styles.producerItem}>
            <Text style={styles.producerName}>Name:            {producer.name}</Text>
            <Text style={styles.producerPrice}>Price:                 {producer.price}</Text>
            <Text style={styles.producerKilograms}>Kilograms:        {producer.kilograms}</Text>
            <Text style={styles.producerKilograms}>Contact:            {producer.contact}</Text>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => handleContactProducer(producer.id)}
            >
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  productId: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  producerItem: {
    marginBottom: 20,
  },
  producerName: {
    fontSize: 18,
  },
  producerPrice: {
    fontSize: 16,
    color: 'green',
  },
  producerKilograms: {
    fontSize: 16,
  },
  contactButton: {
    backgroundColor: '#102247',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Detail;
