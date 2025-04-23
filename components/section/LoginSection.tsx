import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import InputTextField from '../field/InputTextField';
import SkipButton from '../button/SkipButton';
import GoogleLoginButton from '../button/GoogleLoginButton';
import FacebookLoginButton from '../button/FacebookLoginButton';
import InstagramLoginButton from '../button/InstagramLoginButton';
import UserManager from '@/manager/UserManager';
import LinkView from '../view/LinkView';
import ButtonView from '../view/ButtonView';
import ScreenManager from '@/manager/ScreenManager';
import DividerView from '../view/DividerView';

const LoginSection = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getLoginData = () => {
    return Config.forceLogin.enabled === true ? Config.forceLogin.credentials :  {
      email: email,
      password: password,
    };
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let data: any = getLoginData();
    let result: any = await UserManager.login(data);
    setIsProcessing(false);

    if (result?.error) {
      ScreenManager.showMessage({
        title: i18n.t('Profile login'),
        content: result.error,
      });
    }
    else {
      router.replace(Config.mainRoute);
    }
  }  

  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Welcome back')}</TextView> 

      <DividerView />
      
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Email address')} 
        onChangeText={(text: string) => setEmail(text)}
      />

      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Password')} 
        secureTextEntry={true} 
        spellCheck={false}
        onChangeText={(text: string) => setPassword(text)}
      />

      <ButtonView 
        label={i18n.t('Continue')} 
        isProcessing={isProcessing} 
        onPress={() => {
          setIsProcessing(true);
          submitForm();
        }} 
      />

      <BoxView direction="row" align="center" justify="space-between" style={{width: '100%'}}>
        <BoxView direction="row" align="center" justify="flex-start">
          <TextView>{i18n.t('Don\'t have an account?')}</TextView>
          <LinkView onPress={async () => router.replace('/signup')}>
            {i18n.t('Sign up')}
          </LinkView>
        </BoxView>
        <SkipButton onPress={async () => router.replace(Config.mainRoute)} />
      </BoxView>

      <DividerView />

      <GoogleLoginButton />
      <FacebookLoginButton />
      <InstagramLoginButton />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  inputTextFieldContainer: {
    backgroundColor: Colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  }
});

export default LoginSection;
