import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Divider } from '@rneui/base';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
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

const SignupScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const submitForm = async () => {
    // Todo - Connect username and password
    let data: any = [];
    let success: boolean = await UserManager.signup(data);
    setIsProcessing(false);

    if (success) { 
      router.replace('/jams');
    }
    else {
      ScreenManager.showMessage(i18n.t('Invalid registration data submitted. Please check and try again.'));
    }
  }  

  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={{ width: 80, height: 80 }} />    
      <TextView style={styles.wecomeMessage}>{i18n.t('Create an account')}</TextView> 

      <Divider /><Divider />
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Email address')} 
        onChangeText={(text: string) => setUsername(text)}
      />
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Password')} 
        secureTextEntry={true} 
        autoCapitalize={false}
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
          <TextView>{i18n.t('Already have an account?')}</TextView>
          <LinkView onPress={async () => router.replace('/login')}>
            {i18n.t('Sign in')}
          </LinkView>
        </BoxView>
        <SkipButton onPress={async () => router.replace('/jams')} />
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
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
  wecomeMessage: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base*1.1,
  }
});

export default SignupScreen;
