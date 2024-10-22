import { StyleSheet } from 'react-native';
import i18n from '@/translation/i18n';
import InputTextBase from '../base/InputTextBase';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

const UserLocationField = () => {
  return (
    <BoxView direction="row" align="center" style={styles.container}>
      <IconView  name="location" size={22} theme="clear" />
      <InputTextBase placeholder={i18n.t('Location')} containerStyle={styles.containerStyle} />
      
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerStyle: {
    width: '100%',
  }
});

export default UserLocationField;