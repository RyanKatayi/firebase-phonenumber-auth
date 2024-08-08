import { Button, StyleSheet, View } from 'react-native';

import React from 'react';
import { router } from 'expo-router';
import { useAuth } from './AuthContext';

function HomeScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/Welcome'); // Navigate to Welcome screen
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
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
});

export default HomeScreen;
