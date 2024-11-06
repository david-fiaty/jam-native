import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setIsLoggedIn, setAccountData } from '@/redux/slices/UserSlice';
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
import UserManager from '@/classes/UserManager';
import LinkView from '../view/LinkView';
import ButtonView from '../view/ButtonView';

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const userState = useSelector((state: any) => state.user);

  const login = async () => {
    // Todo - Connect username and password
    //let response = await UserManager.login(username, password);
    let response = await UserManager.login('mitsiomotu@yopmail.com', 'Password1234');

    if (response?.tokens?.access_token?.length) {
      dispatch(setAccessToken(JSON.stringify(response.tokens)));
      dispatch(setAccountData(JSON.stringify(response.user)));
      dispatch(setIsLoggedIn(true));
      setIsProcessing(false);

      router.replace('/jams');
    }
    else {
      setIsProcessing(false);
    }
  }  

  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={{ width: 80, height: 80 }} />    
      <TextView style={styles.wecomeMessage}>{i18n.t('Welcome back')}</TextView> 

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
          login();
        }} 
      />

      <BoxView direction="row" align="center" justify="space-between" style={{width: '100%'}}>
        <BoxView direction="row" align="center" justify="flex-start">
          <TextView>{i18n.t('Don\'t have an account?')}</TextView>
          <LinkView onPress={async () => router.replace('/signup')}>
            {i18n.t('Sign up')}
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

export default LoginScreen;
