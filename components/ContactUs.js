// ContactUs.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const ContactUs = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async () => {
    if (name && email && message) {
      try {
        const formData = { name, email, message };
        
        await AsyncStorage.setItem('formData', JSON.stringify(formData));
        
        navigation.navigate('Display');
        
        Alert.alert('Success', 'Form submitted successfully!');
      } catch (error) {
        console.error('Error storing form data:', error);
        Alert.alert('Error', 'Failed to store form data.');
      }
    } else {
      Alert.alert('Error', 'Please fill all required fields.');
    }
  };

  return (
    
    <View style={styles.container}>
      <Image source={require('../assets/images/contactUs.jpg')} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#102247',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  
});

export default ContactUs;
