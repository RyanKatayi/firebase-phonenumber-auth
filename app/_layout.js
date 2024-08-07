import { AuthProvider } from './AuthContext';
// app/_layout.js
import { Stack } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

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
      <Stack />
    </AuthProvider>
  );
}
