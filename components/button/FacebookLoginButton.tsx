import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import ButtonBase from '../base/ButtonBase';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import { Layout } from '@/constants/Layout';

const FacebookLoginButton = () => {
  return (
    <BoxView direction="column" align="center" justify="space-between" style={{width: '100%'}}>
      <ButtonBase
        title={i18n.t('Continue with Facebook')} 
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={() => console.log('clicked')} 
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 0.5, 
    borderColor: Colors.primary,
    borderRadius: Layout.radius.round,
    width: '100%',
    backgroundColor: 'red',
  },
  buttonStyle: {
    backgroundColor: Colors.white,
    width: '100%',
    justifyContent: 'flex-start',
  },
  titleStyle: {
    color: Colors.primary,
  },
});

export default FacebookLoginButton;