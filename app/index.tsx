import { useEffect, useRef } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserManager from '@/manager/UserManager';
import i18next from 'i18next';
import ScreenManager from '@/manager/ScreenManager';

export default () => {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasRedirected = useRef<boolean>(false);

  const getLanguage = async () => {
    Config
    try {
      let language = ScreenManager.isWeb()
        ? localStorage.getItem(Config.storageKeys.currentLanguage)
        : await AsyncStorage.getItem(Config.storageKeys.currentLanguage);

      return language || Config.fallbackLanguage;
    }
    catch (error) {
      console.log(error);

      return Config.fallbackLanguage;
    }
  };

  useEffect(() => {
    if (rootNavigationState?.key && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push('/welcome');
    }

    getLanguage().then((code: string) => {
      i18next.changeLanguage(code);
    })
  }, [rootNavigationState]);

  return null;
}

