import { useEffect, useRef } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import SessionManager from '@/manager/SessionManager';
import UserManager from '@/manager/UserManager';

export default () => {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasRedirected = useRef<boolean>(false);

  useEffect(() => {
    if (rootNavigationState?.key && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push('/welcome');
    }
  }, [rootNavigationState]);

  return null;
}

