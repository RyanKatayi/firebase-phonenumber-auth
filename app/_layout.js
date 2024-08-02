import { useEffect, useState } from 'react';

import { Stack } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

export default function Layout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        router.replace('/auth'); // Redirect to sign-in screen if not authenticated
      } else {
        router.replace('/welcome'); // Redirect to welcome screen if authenticated
      }
    }
  }, [initializing, user]);

  if (initializing) return null; // Show a loading indicator or splash screen here if necessary

  return (
    <Stack>
      {user ? (
        <>
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
