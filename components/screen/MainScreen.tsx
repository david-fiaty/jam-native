import i18n from '@/translation/languages'; 
import { useTranslation } from 'react-i18next';
import { Text, Button } from '@rneui/themed';

export default function MainScreen() {
  const { t } = useTranslation();
  
  return (
    <>
      <Text>Text block</Text>
      <Button title="My Button" />
      <Text>{t('welcome')}</Text>
    </>
  );
}
