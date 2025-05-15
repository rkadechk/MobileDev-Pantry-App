// components/Navbar.js or app/(tabs)/Navbar.js
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [expiringItems, setExpiringItems] = useState(['Milk', 'Eggs']);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.logo}>Pantry Pal</Text>
      </TouchableOpacity>

      <ScrollView horizontal contentContainerStyle={styles.navLinks}>
        <TouchableOpacity style={styles.navLink} onPress={() => router.push('/GetItem')}>
          <Text style={styles.navText}>View Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => router.push('/EditItem')}>
          <Text style={styles.navText}>Edit Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => router.push('/Recipe')}>
          <Text style={styles.navText}>Alert & Recipe</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() => router.push('/Recipe')}
        onPressIn={() => setShowTooltip(true)}
        onPressOut={() => setShowTooltip(false)}
      >
        <FontAwesome name="bell" size={24} color={expiringItems.length > 0 ? 'red' : 'white'} />
        {showTooltip && expiringItems.length > 0 && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              Hey! {expiringItems.join(', ')} is expiring soon.
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginHorizontal: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
  bellContainer: {
    position: 'relative',
    padding: 5,
  },
  tooltip: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    width: 200,
    zIndex: 10,
  },
  tooltipText: {
    color: 'white',
    fontSize: 14,
  },
});
