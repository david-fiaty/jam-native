import { StyleSheet } from 'react-native';
import i18n from '@/translation/i18n';
import InputTextBase from '../base/InputTextBase';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

const UserLocationField = () => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <InputTextBase placeholder={i18n.t('Location')} containerStyle={styles.containerStyle} />
      <IconView name="location" size={22} theme="clear" />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerStyle: {
    width: 'auto',
    flexGrow: 1,
  }
});

export default UserLocationField;