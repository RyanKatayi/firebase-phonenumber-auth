// app/firebaseauth/link.js
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function FirebaseauthLinkPage() {
  const router = useRouter();

  useEffect(() => {
    router.back(); // Redirect back to the original screen
  }, []);

  return null;
}
