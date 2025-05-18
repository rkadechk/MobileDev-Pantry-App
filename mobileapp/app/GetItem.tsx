import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PantryItem {
  id: string;
  name: string;
  expiry: string; // ISO date string
}

const GetItem = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1/items'); // <-- Replace with your backend IP:port
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data: PantryItem[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch pantry items:', error);
        Alert.alert('Error', 'Failed to load pantry items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: PantryItem }) => {
    const isExpiringSoon = new Date(item.expiry).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

    return (
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDate}>Expires: {item.expiry}</Text>
        </View>
        {isExpiringSoon && (
          <MaterialIcons name="warning" size={24} color="red" style={{ marginLeft: 10 }} />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantry Items</Text>
      {items.length === 0 ? (
        <Text>No items in your pantry.</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default GetItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
  },
});
