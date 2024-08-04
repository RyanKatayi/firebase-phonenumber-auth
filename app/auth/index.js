import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import Clipboard from '@react-native-community/clipboard';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const [countryCode, setCountryCode] = useState('ZM');
  const [callingCode, setCallingCode] = useState('260');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [confirmation, setConfirmation] = useState(null);
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const otpInputRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        Alert.alert('Success', 'You have successfully signed in.');
        router.push('/(tabs)'); 
        setIsOtpRequested(false);
      }
    });
    return subscriber; 
  }, []);

  useEffect(() => {
    const checkClipboardForOtp = async () => {
      const clipboardContent = await Clipboard.getString();
      if (clipboardContent && clipboardContent.length === 6 && !isNaN(clipboardContent)) {
        setOtp(clipboardContent.split(''));
        handleVerifyOtp(clipboardContent);
      }
    };

    if (isOtpRequested) {
      const intervalId = setInterval(checkClipboardForOtp, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isOtpRequested]);

  const handleRequestOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Invalid Input', 'Please enter a valid phone number.');
      return;
    }
  
    try {
      const fullPhoneNumber = `+${callingCode}${phoneNumber}`;
      console.log('Requesting OTP for:', fullPhoneNumber);
  
      const confirmationResult = await auth().signInWithPhoneNumber(fullPhoneNumber);
      setConfirmation(confirmationResult);
      setIsOtpRequested(true);
  
      console.log('OTP requested successfully, confirmation result:', confirmationResult);
      Alert.alert('OTP Requested', 'An OTP has been sent to your phone number.');
    } catch (error) {
      console.error('Error requesting OTP:', error);
      Alert.alert('Error', 'Failed to request OTP. Please try again.');
    }
  };
  

  const handleVerifyOtp = async (otpCode = otp.join('')) => {
    if (otpCode.length !== 6 || !confirmation) {
      Alert.alert('Invalid Input', 'Please enter the OTP sent to your phone number.');
      return;
    }

    try {
      await confirmation.confirm(otpCode);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpInputRefs.current.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }

    if (newOtp.join('').length === 6) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {!isOtpRequested ? (
        <>
          <Text style={styles.title}>Let's get started!</Text>
          <Text style={styles.subtitle}>Enter your phone number. We will send you a confirmation code there.</Text>
          <View style={styles.inputContainer}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withCallingCode
              withFilter
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
              containerButtonStyle={styles.countryPicker}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRequestOtp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>6-digit code</Text>
          <Text style={styles.subtitle}>Code sent to {phoneNumber}</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleVerifyOtp()}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => setIsOtpRequested(false)}>
            <Text style={styles.linkText}>Back to phone number input</Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  countryPicker: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#6200EE',
    fontSize: 16,
  },
});
