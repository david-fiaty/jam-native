import { StyleSheet } from 'react-native';
import i18n from '@/translation/i18n';
import InputTextBase from '../base/InputTextBase';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

const UserLocationField = () => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <InputTextBase 
        disabled={true}
        placeholder={i18n.t('Location')} 
        containerStyle={styles.containerStyle} 
        rightIcon={<IconView name="location" size={22} theme="transparent" />}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  containerStyle: {
  }
});

export default UserLocationField;