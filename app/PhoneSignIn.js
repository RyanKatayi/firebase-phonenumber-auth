import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { useAuth } from './AuthContext';

function PhoneSignIn() {
  const { confirm, setConfirm } = useAuth();
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        router.replace('/Home');
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [router]);

  const signInWithPhoneNumber = async (phoneNumber) => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert('Error', 'Failed to send verification code.');
      console.log('Error sending verification code: ', error);
    }
    setLoading(false);
  };

  const confirmCode = async () => {
    setLoading(true);
    try {
      await confirm.confirm(code);
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code.');
      console.log('Invalid code: ', error);
    }
    setLoading(false);
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Verification Code"
        keyboardType="number-pad"
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      )}
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default PhoneSignIn;
