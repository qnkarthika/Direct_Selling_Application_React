import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';

import HomeBackground from '../assets/images/Home.png'; 

export default function HomePage() {
  const navigation = useNavigation();

  const handleShopNow = () => {
    navigation.navigate('Product');
  };

  return (
    <ImageBackground source={HomeBackground} style={styles.container}>
      <Navbar />
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>In a world full of options, direct selling brings the store to your door.</Text>
        <TouchableOpacity style={styles.button} onPress={handleShopNow}>
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom:250,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
