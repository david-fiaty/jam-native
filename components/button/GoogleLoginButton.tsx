import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import Constants from 'expo-constants';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import ImageView from '../view/ImageView';
import { Config } from '@/constants/Config';
import * as AuthSession from 'expo-auth-session';


const GoogleLoginButton = () => {
  const source: any = require('@/assets/images/google-logo.png');
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true } as any);
  const clientId = Config.googleAuthClientId;
  const scope = "openid email profile";
  const state = Math.random().toString(36).substring(2);

  /*
  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${state}` +
    `&prompt=select_account`;

  */

  const discovery: any = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const onPress = async () => {
    const [request, response, promptAsync] = AuthSession.useAuthRequest({
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true } as any),
      responseType: AuthSession.ResponseType.Code,
      prompt: AuthSession.Prompt.SelectAccount,
    }, discovery);


    console.log('request --- ', request);
    console.log('response --- ', request);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
      >
        <ImageView
          path={source}
          width={32}
          height={32}
          resizeMode="cover"
        />
        <TextView>{i18n.t('Continue with Google')}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: Layout.borderWidth.base,
    borderColor: Layout.colors.primary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base / 2,
  },
});

export default GoogleLoginButton;