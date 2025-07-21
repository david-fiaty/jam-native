import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLanguage } from "@/redux/slices/UserSlice";
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import SelectListBase from '../base/SelectListBase';
import UserManager from '@/manager/UserManager';
import ScreenManager from "@/manager/ScreenManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from 'i18next';

const LanguageForm = () => {
  const dispatch = useDispatch();
  const [languageChanged, setLanguageChanged] = useState(0);
  const userState: any = useSelector((state: any) => state.user);

  const getLanguages = () => {
    return [
      {
        label: i18n.t('French'),
        value: 'fr',
      },
      {
        label: i18n.t('English'),
        value: 'en',
      },
    ];
  };

  const changeLanguage = async (languageCode: string) => {
    setCurrentLanguage(languageCode);
    await setLanguage(languageCode);
  };

  const setLanguage = async (languageCode: string) => {
    if (ScreenManager.isWeb()) {
      localStorage.setItem(Config.storageKeys.currentLanguage, languageCode);
    }
    else {
      await AsyncStorage.setItem(Config.storageKeys.currentLanguage, languageCode);
    }

    dispatch(setCurrentLanguage(languageCode))

    i18next.changeLanguage(languageCode);
  };

  useEffect(() => {
    const onLanguageChanged = () => {
      setLanguageChanged(prev => prev + 1);
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n]);

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.formContainer}>
      <SelectListBase
        value={currentlLanguage}
        data={getLanguages()}
        placeholder={i18n.t('Select a language')}
        onChangeValue={async (option: any) => await changeLanguage(option.value)}
      />
    </BoxView>
  );
};

export default LanguageForm;