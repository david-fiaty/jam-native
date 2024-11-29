import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import i18next from 'i18next';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import UserManager from '@/manager/UserManager';

const LanguageForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = StaticData.languages;

  const changeLanguage = (language: any) => {
    i18next.changeLanguage(language.value);
    UserManager.setLanguage(language);
  };

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Language')}
        onPress={() => router.back()}
      />
      <SelectListBase
        value={UserManager.getLanguage()}
        data={data} 
        placeholder={i18n.t('English')} 
        onChangeValue={((option: any) => changeLanguage(option))}
      />
    </BoxView>
  );
};

export default LanguageForm;