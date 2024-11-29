import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/redux/slices/AppSlice';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import i18next from 'i18next';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';

const LanguageForm = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state.app);
  const router = useRouter();
  const data = StaticData.languages;

  console.log(appState.language);

  const changeLanguage = (language: any) => {
    dispatch(setLanguage(language.value));
    i18next.changeLanguage(language.value);
  };

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Language')}
        onPress={() => router.back()}
      />
      <SelectListBase 
        data={data} 
        placeholder={i18n.t('English')} 
        onChangeValue={((option: any) => changeLanguage(option))}
      />
    </BoxView>
  );
};

export default LanguageForm;