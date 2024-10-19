import i18n from '@/translation/i18n'; 
import { useTranslation } from 'react-i18next';
import { Text, Button } from '@rneui/themed';

export default function MainScreen() {
  //const { t } = useTranslation();
  
  return (
    <>
      <Text>Text block</Text>
      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
    </>
  );
}
