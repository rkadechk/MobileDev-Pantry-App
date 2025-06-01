import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function AddItem() {
  const [item, setItem] = useState({
    name: '',
    category: '',
    quantity: '',
    expirationDate: '',
  });

  const handleChange = (key: string, value: string) => {
    setItem({ ...item, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.254.14:5000/add-item', item);
      Alert.alert('Success', 'Item added successfully');
      setItem({ name: '', category: '', quantity: '', expirationDate: '' });
    } catch (error) {
      Alert.alert('Error', 'Failed to add item');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Grocery Item</Text>
      <TextInput style={styles.input} placeholder="Name" value={item.name} onChangeText={(text) => handleChange('name', text)} />
      <TextInput style={styles.input} placeholder="Category" value={item.category} onChangeText={(text) => handleChange('category', text)} />
      <TextInput style={styles.input} placeholder="Quantity" value={item.quantity} onChangeText={(text) => handleChange('quantity', text)} />
      <TextInput style={styles.input} placeholder="Expiration Date (YYYY-MM-DD)" value={item.expirationDate} onChangeText={(text) => handleChange('expirationDate', text)} />
      <Button title="Add Item" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
