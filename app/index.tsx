import { useEffect, useRef } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import UserManager from '@/manager/UserManager';
import i18next from 'i18next';

export default () => {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasRedirected = useRef<boolean>(false);

  useEffect(() => {
    if (rootNavigationState?.key && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push('/welcome');
    }

    UserManager.getLanguage().then((code: string) => {
      i18next.changeLanguage(code);
    })
  }, [rootNavigationState]);

  return null;
}

