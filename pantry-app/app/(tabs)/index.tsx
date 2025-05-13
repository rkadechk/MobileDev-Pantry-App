import React from 'react';
import { View, StyleSheet } from 'react-native';
import ViewItems from '../../components/ViewItems';

export default function Index() {
  return (
    <View style={styles.container}>
      <ViewItems />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
