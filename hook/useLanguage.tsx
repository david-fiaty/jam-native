import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenManager from '@/manager/ScreenManager';

export function useLanguage() {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const storedLanguage = await AsyncStorage.getItem('userLanguage');
        const deviceLanguage = ScreenManager.getLanguage();
        setLanguage(storedLanguage || deviceLanguage);
      } catch (error) {
        console.error('Error fetching language:', error);
        setLanguage(ScreenManager.getLanguage());
      }
    }

    fetchLanguage();
  }, []);

  return language;
}
