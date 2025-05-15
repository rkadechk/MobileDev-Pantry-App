import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

const Navbar = () => {
  const router = useRouter();
  const expiringItems = ['Milk', 'Eggs']; // example alerts
  const [showModal, setShowModal] = useState(false);

  const handleBellPress = () => {
    if (expiringItems.length > 0) {
      setShowModal(true);
    } else {
      router.push('/Recipe');
    }
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    router.push('/Recipe');
  };

  return (
    <View style={styles.safeArea}>
      <View style={{ overflow: 'visible', backgroundColor: '#222' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navbar}
        >
          {/* Other nav items */}
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

          <TouchableOpacity style={styles.navItem} onPress={handleBellPress}>
            <FontAwesome
              name="bell"
              size={20}
              color={expiringItems.length > 0 ? 'red' : 'white'}
            />
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Modal popup */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Expiring Items:</Text>
            {expiringItems.map((item, index) => (
              <Text key={index} style={styles.modalItem}>• {item}</Text>
            ))}

            <Pressable style={styles.modalButton} onPress={closeModalAndNavigate}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  modalItem: {
    fontSize: 16,
    marginVertical: 2,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Navbar;
