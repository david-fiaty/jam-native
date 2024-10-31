import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from '@rneui/base';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import InputTextField from '../field/InputTextField';
import ContinueButton from '../button/ContinueButton';
import SkipButton from '../button/SkipButton';
import GoogleLoginButton from '../button/GoogleLoginButton';
import FacebookLoginButton from '../button/FacebookLoginButton';
import InstagramLoginButton from '../button/InstagramLoginButton';

const LoginScreen = () => {
  const [emailValue, setEmailValue] = useState(null);

  console.log(emailValue);

  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={{ width: 80, height: 80 }} />    
      <TextView style={styles.wecomeMessage}>{i18n.t('Welcome back')}</TextView> 

      <Divider /><Divider />
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Email address')} 
        onChangeText={(text) => setEmailValue(text) }
      />
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Password')} 
        onChangeText={(text) => setEmailValue(text) }
      />
      <ContinueButton onPress={() => console.log('clicked') } />
      <BoxView direction="row" align="center" justify="space-between" style={{width: '100%'}}>
        <TextView>{i18n.t("Don't have an account?")}</TextView>
        <SkipButton onPress={() => {}} />
      </BoxView>

      <Divider /><Divider />
      <GoogleLoginButton />
      <FacebookLoginButton />
      <InstagramLoginButton />
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
    fontSize: Layout.fontSize.base*1.1,
  }
});

export default LoginScreen;
