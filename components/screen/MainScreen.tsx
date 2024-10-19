import { Text, Button } from '@rneui/themed';
import i18n from '@/translation/i18n'; 


export default () => {  
  return (
    <>
      <Text>Text block</Text>
      <Button title="My Button" />
      <Text>{i18n.t('welcome')}</Text>
    </>
  );
}
