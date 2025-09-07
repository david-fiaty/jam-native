import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentLanguage } from "@/redux/slices/UserSlice";
import { Layout } from '@/constants/Layout';
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import SelectListBase from '../base/SelectListBase';
import ScreenManager from "@/manager/ScreenManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from 'i18next';
import SectionManager from "@/manager/SectionManager";

const LanguageForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [languageChanged, setLanguageChanged] = useState(0);
  const userState: any = useSelector((state: any) => state.user, shallowEqual);

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

  const setLanguage = async (code: string) => {
    if (ScreenManager.isWeb()) {
      localStorage.setItem(Config.storageKeys.currentLanguage, code);
    }
    else {
      await AsyncStorage.setItem(Config.storageKeys.currentLanguage, code);
    }

    dispatch(setCurrentLanguage(code))
    i18next.changeLanguage(code);
    SectionManager.replace(router, 'language');
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
        value={userState.currentLanguage}
        data={getLanguages()}
        placeholder={i18n.t('Select a language')}
        onChangeValue={async (option: any) => await setLanguage(option.value)}
      />
    </BoxView>
  );
};

export default LanguageForm;