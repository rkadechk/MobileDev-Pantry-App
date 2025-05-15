import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

const Navbar = () => {
  const router = useRouter();
  const expiringItems = ['Milk', 'Eggs']; // Hardcoded example alerts

  return (
    <View style={styles.safeArea}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navbar}
      >
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Home')}>
          <Entypo name="home" size={20} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/GetItem')}>
          <MaterialIcons name="inventory" size={20} color="white" />
          <Text style={styles.navText}>View Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/EditItem')}>
          <FontAwesome name="edit" size={20} color="white" />
          <Text style={styles.navText}>Edit Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Recipe')}>
          <FontAwesome name="bell" size={20} color={expiringItems.length > 0 ? 'red' : 'white'} />
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#222',
    elevation: 4,
    zIndex: 100,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});

export default Navbar;
