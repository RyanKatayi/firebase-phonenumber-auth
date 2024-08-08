import { router } from 'expo-router';
import { useEffect } from 'react';

export default function FirebaseauthLinkPage() {

  useEffect(() => {
    router.back(); // Redirect back to the original screen
  }, []);

  return null;
}
