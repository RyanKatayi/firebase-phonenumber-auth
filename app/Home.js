// app/Home.js
import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

function Home() {
  const router = useRouter();

  const signOut = () => {
    auth().signOut();
    router.replace('/Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button title="Sign Out" onPress={signOut} />
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

export default Home;
