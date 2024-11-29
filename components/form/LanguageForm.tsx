import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';

const LanguageForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = StaticData.languages;
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Language')}
        onPress={() => router.back()}
      />
      <SelectListBase 
        data={data} 
        placeholder={i18n.t('English')} 
        onChangeValue={((option: any) => console.log(option))}
      />
    </BoxView>
  );
};

export default LanguageForm;