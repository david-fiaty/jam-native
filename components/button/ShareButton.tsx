import { StyleSheet } from 'react-native';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';


const ShareButton = () => {
  return (       
    <IconView name="user" size={22} theme="tertiary" />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ShareButton;