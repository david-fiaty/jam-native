import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import Constants from 'expo-constants';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import ImageView from '../view/ImageView';
import { Config } from '@/constants/Config';
import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';


const GoogleLoginButton = () => {
  const source: any = require('@/assets/images/google-logo.png');
  const clientId: string = Config.googleAuthClientId;
  const redirectUri: string = AuthSession.makeRedirectUri({ useProxy: true } as any);

  const discovery: any = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      prompt: AuthSession.Prompt.SelectAccount,
    },
    discovery
  );

  const onPress = () => {
    promptAsync();
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Google auth code:', code);
    }
  }, [response]);

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