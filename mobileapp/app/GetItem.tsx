import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

type Item = {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  expirationDate: string;
};

export default function GetItem() {
  // State to hold all pantry items fetched from backend
  const [items, setItems] = useState<Item[]>([]);

  // Fetch items once component mounts
  useEffect(() => {
    axios.get('http://1.1.1.1:5000/getItems')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  // Renders each item in the list with styling and buttons
  const renderItem = ({ item }: { item: Item }) => {
    const today = new Date();
    const expiration = new Date(item.expirationDate);
    
    // Calculate how many days left until expiration
    const daysDiff = Math.ceil((expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Check if expired or expiring soon (within 2 days)
    const isExpired = expiration < today;
    const isExpiringSoon = daysDiff <= 2 && daysDiff >= 0;

    // Choose background style based on expiration status
    const boxStyle = [
      styles.itemBox,
      isExpired ? styles.expiredBox : isExpiringSoon ? styles.soonBox : null,
    ];

    // Change text color to red if expired
    const textColorStyle = isExpired ? styles.expiredText : styles.itemText;

    return (
      <View style={boxStyle}>
        {/* Item details section */}
        <View style={styles.itemDetails}>
          <Text style={textColorStyle}>Name: {item.name}</Text>
          <Text style={textColorStyle}>Category: {item.category}</Text>
          <Text style={textColorStyle}>Quantity: {item.quantity}</Text>
          <Text style={textColorStyle}>
            Expiration: {expiration.toDateString()}
            {isExpiringSoon ? ' (Expiring Soon)' : ''}
          </Text>
        </View>

        {/* Edit and Delete buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton} onPress={() => {/* Edit handler goes here */}}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {/* Delete handler goes here */}}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantry Items</Text>
      {/* FlatList for efficient scrolling of pantry items */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  itemBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',         // Arrange details and buttons side by side
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,                      // Take up all space except buttons
    paddingRight: 10,
  },
  soonBox: {
    backgroundColor: '#fff8cc',   // Light yellow background for soon-expiring items
  },
  expiredBox: {
    backgroundColor: '#ffe6e6',   // Light red background for expired items
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  expiredText: {
    fontSize: 16,
    color: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,                     // Space between buttons (gap supported in newer RN)
  },
  editButton: {
    backgroundColor: '#007bff',   // Bootstrap blue
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',   // Bootstrap red
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
