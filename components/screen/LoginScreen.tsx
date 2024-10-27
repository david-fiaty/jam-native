import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

import InputTextField from '../field/InputTextField';
import ContinueButton from '../button/ContinueButton';

const LoginScreen = () => {
  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={{ width: 80, height: 80 }} />    
      <TextView style={styles.wecomeMessage}>{i18n.t('Welcome back')}</TextView> 
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Enter your email address')} 
      />
      <ContinueButton onPress={() => console.log('clicked') }/>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  inputTextFieldContainer: {
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
  wecomeMessage: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base*1.2,
  }
});

export default LoginScreen;
