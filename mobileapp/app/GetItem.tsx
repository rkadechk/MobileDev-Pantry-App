import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PantryItem {
  id: string;
  name: string;
  expiry: string; // ISO date string
}

const GetItem = () => {
  const [items, setItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    // Mock pantry data - Replace this with actual API call
    const mockData: PantryItem[] = [
      { id: '1', name: 'Milk', expiry: '2025-05-20' },
      { id: '2', name: 'Eggs', expiry: '2025-05-19' },
      { id: '3', name: 'Cheese', expiry: '2025-06-10' },
    ];
    setItems(mockData);
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
