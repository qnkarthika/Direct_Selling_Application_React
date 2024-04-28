import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prevState => !prevState);
  };
  
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
    setShowMenu(false); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      {showMenu && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Home')}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Product')}>
            <Text style={styles.menuText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('ContactUs')}>
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  menuButton: {
    marginLeft: 10,
    marginTop: 60,
    zIndex: 150,
  },
  menuText: {
    fontSize: 20,
  },
  menuContainer: {
    position: 'absolute',
    top: 85,
    left: 0,
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 20,
    elevation: 5,
    marginTop: 30,
  },
  menuItem: {
    padding: 10,
  },
});

export default Navbar;
