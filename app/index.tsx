import { useEffect, useState, useRef } from 'react';
import { setCountriesData, setCulturalActivityTypesData, setOrganizationTypesData, setProfessionsData, setSectorsData, setVenueTypesData } from '@/redux/slices/AppSlice';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useDispatch } from "react-redux";
import { setCurrentLanguage } from '@/redux/slices/UserSlice';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import ScreenManager from '@/manager/ScreenManager';
import EntityManager from '@/manager/EntityManager';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasRedirected = useRef<boolean>(false);
  const [appReady, setAppReady] = useState<boolean>(false);

  const setLanguage = async () => {
    let code: any = ScreenManager.isWeb()
      ? localStorage.getItem(Config.storageKeys.currentLanguage)
      : await AsyncStorage.getItem(Config.storageKeys.currentLanguage);

    dispatch(setCurrentLanguage(code || Config.fallbackLanguage));
    i18next.changeLanguage(code);
  };

  useEffect(() => {
    (async () => {
      await setLanguage();

      const [sectors, countries, professions, venueTypes, organizationTypes, culturalActivityTypes] = await Promise.all([
        EntityManager.getSectors(),
        EntityManager.getCountries(),
        EntityManager.getProfessions(),
        EntityManager.getVenueTypes(),
        EntityManager.getOrganizationTypes(),
        EntityManager.getCulturalActivitiesTypes(),
      ]);

      dispatch(setSectorsData(sectors));
      dispatch(setCountriesData(countries));
      dispatch(setProfessionsData(professions));
      dispatch(setVenueTypesData(venueTypes));
      dispatch(setOrganizationTypesData(organizationTypes));
      dispatch(setCulturalActivityTypesData(culturalActivityTypes));
      setAppReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (!appReady) return;
    if (hasRedirected.current) return;

    hasRedirected.current = true;

    setTimeout(() => {
      router.replace(Config.defaultRoute);
    }, 0);
  }, [rootNavigationState, appReady]);
}

