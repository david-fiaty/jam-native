import { Text, Button } from '@rneui/themed';
import i18n from '@/translation/i18n'; 
import ScreenView from '../view/ScreenView';

export default () => {  
  return (
    <ScreenView>
      <Text>Text block</Text>
      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
    </ScreenView>
  );
}
