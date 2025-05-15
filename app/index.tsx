import { useState, useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import SectionManager from '@/manager/SectionManager';

export default () => {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (rootNavigationState?.key && !isLoaded) {
      setIsLoaded(true);
      SectionManager.push(router, 'welcome');
    }
  }, [isLoaded, rootNavigationState]);

  return null;
}

