import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GetItem = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is the GetItem screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default GetItem;
