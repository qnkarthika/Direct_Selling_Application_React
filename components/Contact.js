import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system'; // Import FileSystem module from Expo

const Contact = ({ route }) => {
  const navigation = useNavigation();
  const producers = route.params?.producers || [];
  const [consumerName, setConsumerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [kgs, setKgs] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = async (producerId, requestedKgs) => {
    if (!consumerName || !contactNumber || !kgs || !address) {
      Alert.alert('Fill all the required fields');
      return;
    }
  
    
    try {
     
      await saveContactToStorage();
      await writeToCSV(); 

      const producer = producers.find(producer => producer.id === producerId);
    
      const requestedKgsNum = parseInt(requestedKgs);
    
      const availableKgsNum = parseInt(producer.kilograms.split(' ')[0]);
    
      if (requestedKgsNum <= availableKgsNum) {
        setOrderPlaced(true);
      } else {
        alert(`Requested kilograms (${requestedKgs}) are not available with ${producer.name}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const saveContactToStorage = async () => {
    try {
      const contactDetails = {
        consumerName,
        contactNumber,
        kgs,
        address,
      };
      await AsyncStorage.setItem('contactDetails', JSON.stringify(contactDetails));
      console.log('Contact details saved successfully');
    } catch (error) {
      console.error('Error saving contact details:', error);
    }
  };

  const writeToCSV = async () => {
    try {
      const csvContent = `Consumer Name,Contact Number,Kg,Address\n${consumerName},${contactNumber},${kgs},${address}\n`;

      const directory = FileSystem.documentDirectory + 'exports';

      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      const fileName = `${directory}/user_details.csv`;

      await FileSystem.writeAsStringAsync(fileName, csvContent);

      console.log('CSV file saved successfully');
    } catch (error) {
      console.error('Error writing CSV file:', error);
    }
  };

  

  const handleDecrement = () => {
    if (parseInt(kgs) > 0) {
      setKgs(prevKgs => (parseInt(prevKgs) - 1).toString());
    }
  };
  const handleIncrement = () => {
    setKgs(prevKgs => (parseInt(prevKgs || 0) + 1).toString());
  };
 
  const handleViewData = () => {
    navigation.navigate('DisplayData');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Consumer Name"
        value={consumerName}
        onChangeText={text => setConsumerName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="numeric"
        value={contactNumber}
        onChangeText={text => setContactNumber(text)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.kgInput}
          placeholder="Kilograms"
          keyboardType="numeric"
          value={kgs}
          onChangeText={text => setKgs(text)}
        />
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleDecrement}
        >
          <Text style={styles.arrowButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleIncrement}
        >
          <Text style={styles.arrowButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
       {orderPlaced && <Text style={styles.orderPlacedText}>Your order has been placed!</Text>}

      <TouchableOpacity 
        style={styles.orderButton} 
        onPress={() => handleOrder(1, kgs)} // Example: Pass producerId and requested kilograms
      >
        
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleViewData} style={styles.viewDataButton}>
        <Text style={styles.viewDataButtonText}>View Data</Text>
      </TouchableOpacity>
      <Image source={require('../assets/images/formm.png')} style={styles.image} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowButton: {
    backgroundColor: '#102247',
    borderRadius: 5,
    padding: 10,
    height: 40,
    marginLeft: 10,
    marginRight:5,
  },
  arrowButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  kgInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: '#102247',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  orderPlacedText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
  viewDataButton: {
    backgroundColor: '#102247',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  viewDataButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  
});

export default Contact;
