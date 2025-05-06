import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import i18next from 'i18next';
import BoxView from "../view/BoxView";
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import UserManager from '@/manager/UserManager';

const LanguageForm = () => {
  const router = useRouter();
  const data = StaticData.languages;

  const changeLanguage = (language: any) => {
    i18next.changeLanguage(language.value);
    UserManager.setLanguage(language.value);
  };

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
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