import React, { useEffect, useState } from 'react';

import SignInScreen from './auth';
import Tabs from './(tabs)';
import WelcomeScreen from './welcome';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Layout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(null); 
      setInitializing(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (initializing) return null; 

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="auth"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
