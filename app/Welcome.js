// app/Welcome.js
import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { router } from 'expo-router';

function Welcome() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App!</Text>
      <Button title="Get Started" onPress={() => router.push('/PhoneSignIn')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Welcome;
