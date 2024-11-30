import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceManager from '@/manager/DeviceManager';

export function useLanguage() {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const storedLanguage = await AsyncStorage.getItem('userLanguage');
        const deviceLanguage = DeviceManager.getLanguage();
        setLanguage(storedLanguage || deviceLanguage);
      } catch (error) {
        console.error('Error fetching language:', error);
        setLanguage(DeviceManager.getLanguage());
      }
    }

    fetchLanguage();
  }, []);

  return language;
}
