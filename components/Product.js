import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import Detail from './Detail';
import tomatoImage from '../assets/images/tomato.jpg';
import cucumberImage from '../assets/images/cucumber.jpeg';
import carrotImage from '../assets/images/carrot.jpeg';
import cornImage from '../assets/images/corn.jpeg';
import gingerImage from '../assets/images/ginger.jpeg';
import onionImage from '../assets/images/onion.jpg';
import brinjalImage from '../assets/images/brinjal.jpeg';
import beetrootImage from '../assets/images/beetroot.jpg';
import cherryImage from '../assets/images/Cherry.jpg';
const Product = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: 'Cucumber',
      description: 'Description of Product 1',
      price: '$10',
      image: cucumberImage,
    },
    {
      id: 2,
      name: 'Tomato',
      description: 'Description of Product 2',
      price: '$20',
      image: tomatoImage,
    },
    {
      id: 3,
      name: 'Carrot',
      description: 'Description of Product 3',
      price: '$30',
      image: carrotImage,
    },
    {
      id: 4,
      name: 'Brinjal',
      description: 'Description of Product 4',
      price: '$40',
      image: brinjalImage,
    },
    {
      id: 5,
      name: 'Corn',
      description: 'Description of Product 5',
      price: '$50',
      image: cornImage,
    },
    {
      id: 6,
      name: 'Ginger',
      description: 'Description of Product 6',
      price: '$60',
      image: gingerImage,
    },
    {
      id: 7,
      name: 'Onion',
      description: 'Description of Product 7',
      price: '$70',
      image: onionImage,
    },
    {
      id: 8,
      name: 'Beetroot',
      description: 'Description of Product 7',
      price: '$70',
      image: beetrootImage,
    },
    {
      id: 9,
      name: 'Cherry',
      description: 'Description of Product 7',
      price: '$70',
      image: cherryImage,
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductDetail = (productId) => {
    navigation.navigate('Detail', { productId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="white" style={styles.searchIcon} />
        <TextInput
  style={styles.input}
  placeholder="Search Products"
  placeholderTextColor="white"
  onChangeText={setSearchQuery}
  value={searchQuery}
/>

      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        {filteredProducts.map(product => (
          <TouchableOpacity key={product.id} style={styles.productItem} onPress={() => handleProductDetail(product.id)}>
            <Text style={styles.productName}>{product.name}</Text>
            <Image source={product.image} style={styles.productImage} />

            
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    marginBottom:20,
    alignItems:'center'
  },
  productImage: {
    width: '90%',
    height: 200,
    resizeMode: 'cover',
    marginBottom:10,
    borderColor: '#102247', 
    borderWidth: 5, 
  },
  
  productName: {
    fontSize: 18,
    color:'#102247',
    textAlign:'center',
    marginTop:10,
  },
  productPrice: {
    fontSize: 16,
    color: '#007bff',
    
  },
  searchBar: {
    marginTop:10,
    backgroundColor:'#102247',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    width: '90%', 
    marginLeft: 20,
  },
  searchIcon: {
    marginRight: 10,
    color:'white',
  },
  input: {
    color:'white',
    textDecorationColor:'white',
    flex: 1,
    height: 40,
    
  },
});

export default Product;
