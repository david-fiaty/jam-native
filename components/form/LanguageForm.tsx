import { useState, useEffect } from "react";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import i18next from 'i18next';
import BoxView from "../view/BoxView";
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import UserManager from '@/manager/UserManager';

const LanguageForm = () => {
  const [currentlLanguage, setCurrentLanguage] = useState<any[]>([]);
  const data = StaticData.languages;

  const changeLanguage = (language: any) => {
    i18next.changeLanguage(language.value);
    UserManager.setLanguage(language.value);
  };

  useEffect(() => {
    (async () => {
      setCurrentLanguage(await UserManager.getLanguage());
    })();
  }, []);

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.formContainer}>
      <SelectListBase
        value={currentlLanguage}
        data={data} 
        placeholder={i18n.t('English')} 
        onChangeValue={((option: any) => changeLanguage(option))}
      />
    </BoxView>
  );
};

export default LanguageForm;