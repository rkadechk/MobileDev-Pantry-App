import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function AddItem() {
  // State to hold the new item's data
  const [item, setItem] = useState({
    name: '',
    category: '',
    quantity: '',
    purchaseDate: '',
    expirationDate: '',
  });

  // Update the state when input changes
  const handleChange = (key: string, value: string) => {
    setItem(prev => ({ ...prev, [key]: value }));
  };

  // Called when user taps "Add Item"
  const handleSubmit = async () => {
    try {
      // Prepare the data to send — convert quantity to a number
      const payload = {
        ...item,
        quantity: Number(item.quantity),
      };

      // Send the new item to the backend
      await axios.post('http://1.1.1.1:5000/add-item', payload);

      // Show success message
      Alert.alert('Success', 'Item added successfully');

      // Reset the form
      setItem({ name: '', category: '', quantity: '', purchaseDate: '', expirationDate: '' });
    } catch (error) {
      // Something went wrong — show error alert
      Alert.alert('Error', 'Failed to add item');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Grocery Item</Text>

      {/* Input for item name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={item.name}
        onChangeText={text => handleChange('name', text)}
      />

      {/* Input for category */}
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={item.category}
        onChangeText={text => handleChange('category', text)}
      />

      {/* Input for quantity — numeric keyboard */}
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={item.quantity}
        onChangeText={text => handleChange('quantity', text)}
      />

      {/* Input for purchase date */}
      <TextInput
        style={styles.input}
        placeholder="Purchase Date (YYYY-MM-DD)"
        value={item.purchaseDate}
        onChangeText={text => handleChange('purchaseDate', text)}
      />

      {/* Input for expiration date */}
      <TextInput
        style={styles.input}
        placeholder="Expiration Date (YYYY-MM-DD)"
        value={item.expirationDate}
        onChangeText={text => handleChange('expirationDate', text)}
      />

      {/* Button to submit the form */}
      <Button title="Add Item" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
