import { useState, useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default () => {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (rootNavigationState?.key && !isLoaded) {
      setIsLoaded(true);
      router.push('/welcome');
    }
  }, [isLoaded, rootNavigationState]);

  return null;
}

