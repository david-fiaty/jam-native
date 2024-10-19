import { Text, Button } from '@rneui/themed';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';
import AppHeader from '../navigation/AppHeader';

export default () => {  
  return (
    <ScreenView>
      <AppHeader />
      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
    </ScreenView>
  );
}
