import { useState, useEffect } from "react";
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
  const [currentlLanguage, setCurrentLanguage] = useState<string>('');

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

    i18next.changeLanguage(languageCode);
  };

  useEffect(() => {
    (async () => {
      setCurrentLanguage(await UserManager.getLanguage());
    })();
  }, [currentlLanguage]);

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