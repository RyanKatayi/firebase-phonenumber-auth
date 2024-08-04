import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      router.replace('/auth');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
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
    marginBottom: 30,
  },
});
