import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

type Props = BaseProps & {
  latitude?: any,
  longitude?: any,
};

const UserLocationField = ({latitude, longitude}: Props) => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <InputTextField 
        disabled={true}
        placeholder={i18n.t('Location')} 
        containerStyle={styles.containerStyle} 
        rightIcon={<IconView name="location" theme="transparent" />}
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