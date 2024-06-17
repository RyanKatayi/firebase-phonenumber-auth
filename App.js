import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    const [isOtpRequested, setIsOtpRequested] = useState(false);

    const handleRequestOtp = async () => {
        if (!phoneNumber) {
            Alert.alert('Invalid Input', 'Please enter a valid phone number.');
            return;
        }

        try {
            const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirmation(confirmationResult);
            setIsOtpRequested(true);
            Alert.alert('OTP Requested', 'An OTP has been sent to your phone number.');
        } catch (error) {
            console.error('Error requesting OTP:', error);
            Alert.alert('Error', 'Failed to request OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || !confirmation) {
            Alert.alert('Invalid Input', 'Please enter the OTP sent to your phone number.');
            return;
        }

        try {
            await confirmation.confirm(otp);
            Alert.alert('Success', 'You have successfully signed in.');
            // Handle successful sign-in here
        } catch (error) {
            console.error('Error verifying OTP:', error);
            Alert.alert('Error', 'Invalid OTP. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Number Sign In</Text>

            {!isOtpRequested ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRequestOtp}>
                        <Text style={styles.buttonText}>Request OTP</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkButton} onPress={() => setIsOtpRequested(false)}>
                        <Text style={styles.linkText}>Back to phone number input</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

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
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
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
        color: '#007bff',
        fontSize: 16,
    },
});

export default App;
