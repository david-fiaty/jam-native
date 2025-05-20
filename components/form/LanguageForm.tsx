import { useState, useEffect } from "react";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import UserManager from '@/manager/UserManager';

const LanguageForm = () => {
  const [currentlLanguage, setCurrentLanguage] = useState<string>('');
  const data = StaticData.languages;

  const changeLanguage = async (languageCode: string) => {
    setCurrentLanguage(languageCode);  // Todo - Test language selection
    await UserManager.setLanguage(languageCode);
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
        placeholder={i18n.t('Select a language')} 
        onChangeValue={async (option: any) => await changeLanguage(option.value)}
      />
    </BoxView>
  );
};

export default LanguageForm;