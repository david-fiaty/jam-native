import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import SkipButton from '../button/SkipButton';
import GoogleLoginButton from '../button/GoogleLoginButton';
import FacebookLoginButton from '../button/FacebookLoginButton';
import InstagramLoginButton from '../button/InstagramLoginButton';
import LinkView from '../view/LinkView';
import DividerView from '../view/DividerView';
import SectionManager from '@/manager/SectionManager';
import TabsView from '../view/TabsView';
import SpinnerView from '../view/SpinnerView';
import LoginEmailForm from '../form/login-email/LoginEmailForm';
import LoginPhoneForm from '../form/login-phone/LoginPhoneForm';
import FormManager from '@/manager/FormManager';

const resource: string = 'login';

const LoginSection = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<any>(null);

  const tabsData: any = [
    {
      id: 'email',
      label: i18n.t('Email'),
      default: true,
    },
    {
      id: 'phone',
      label: i18n.t('Whatsapp'),
    },
  ];

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        //FormManager.resetForm(resource); // Todo - Fix form reset on web
        setCurrentTab((tabsData.find((o: any) => o?.default === true))?.id);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, resource, tabsData]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView 
      direction="column" 
      align="center" 
      justify="center" 
      style={Layout.screenContent}
    >
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Welcome back')}</TextView> 

      <DividerView />
  
      <TabsView 
        tabs={tabsData} 
        currentTab={currentTab} 
        onItemPress={(tabId: string) => setCurrentTab(tabId)}
      />
      
      {currentTab === 'email' && <LoginEmailForm />}

      {currentTab === 'phone' && <LoginPhoneForm />}

      <BoxView direction="row" align="center" justify="space-between" style={styles.linkContainer}>
        <LinkView onPress={() => SectionManager.push(router, 'reset-password')}>
          {i18n.t('Forgot password')}
        </LinkView>
      </BoxView>

      <BoxView direction="row" align="center" justify="space-between" style={styles.linkContainer}>
        <BoxView direction="row" align="center" justify="flex-start">
          <TextView>{i18n.t('Don\'t have an account?')}</TextView>
          <LinkView onPress={() => SectionManager.push(router, 'signup')}>
            {i18n.t('Sign up')}
          </LinkView>
        </BoxView>
        <SkipButton onPress={() => SectionManager.push(router, Config.mainSection)} />
      </BoxView>

      <DividerView />

      <GoogleLoginButton />
      { /*<FacebookLoginButton />*/ }
      { /*<InstagramLoginButton />*/ }

    </BoxView>
  );
};

const styles = StyleSheet.create({
  inputTextFieldContainer: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
  linkContainer: {
    width: '100%',
  },
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  }
});

export default LoginSection;
