import { AuthProvider } from './AuthContext';
import { Stack } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        router.replace('/Home');
      } else {
        router.replace('/Welcome');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}/>
    </AuthProvider>
  );
}
