import { useEffect, useRef } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useDispatch } from "react-redux";
import { setCurrentLanguage } from '@/redux/slices/UserSlice';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import ScreenManager from '@/manager/ScreenManager';
import SearchManager from '@/manager/SearchManager';
import UserManager from '@/manager/UserManager';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasRedirected = useRef<boolean>(false);

  const setLanguage = async () => {
    let code: any = ScreenManager.isWeb()
      ? localStorage.getItem(Config.storageKeys.currentLanguage)
      : await AsyncStorage.getItem(Config.storageKeys.currentLanguage);

    dispatch(setCurrentLanguage(code || Config.fallbackLanguage));
    i18next.changeLanguage(code);
  };

  useEffect(() => {
    if (rootNavigationState?.key && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push('/welcome');
    }
  }, [rootNavigationState]);

  useEffect(() => {
    (async () => {
      await setLanguage();
      await SearchManager.loadResults();
    })();
  }, []);

  return null;
}

