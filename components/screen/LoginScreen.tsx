import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setIsLoggedIn } from '@/redux/slices/UserSlice';
import { useRouter } from 'expo-router';
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
import UserManager from '@/classes/UserManager';

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userState = useSelector((state) => state.user);

  const login = async () => {
    // Todo - Connect username and password
    //let response = await UserManager.login(username, password);
    let response = await UserManager.login('mitsiomotu@yopmail.com', 'Password1234');

    if (response?.tokens?.access_token?.length) {
      dispatch(setAccessToken(JSON.stringify(response.tokens)));
      dispatch(setIsLoggedIn(true));

      router.replace('/main');
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
        onChangeText={(text) => setUsername(text)}
      />
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Password')} 
        secureTextEntry={true} 
        autoCapitalize="none"
        spellCheck={false}
        onChangeText={(text) => setPassword(text)}
      />

      <ContinueButton onPress={login} />

      <BoxView direction="row" align="center" justify="space-between" style={{width: '100%'}}>
        <TextView>{i18n.t('New user? Create an account')}</TextView>
        <SkipButton onPress={async () => router.push('/main')} />
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
