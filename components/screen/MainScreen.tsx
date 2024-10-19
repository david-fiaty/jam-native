
import { useTranslation, initReactI18next } from "react-i18next";
import { Text, Button } from '@rneui/themed';
import  t from '@/translation/i18n'; 


export default () => {  
  const { t } = useTranslation();
  
  return (
    <>
      <Text>Text block</Text>
      <Button title="My Button" />
      <Text>{t('welcome')}</Text>
    </>
  );
}
