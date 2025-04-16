import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Divider } from '@rneui/base';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import BackButton from '../button/BackButton';
import BottomLinks from '../navigation/BottomLinks';
import ScreenManager from '@/manager/ScreenManager';

const data = {
  title: 'About',
  text: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  ],
};

const AboutSection = () => {
  const router = useRouter();

  const renderComponent = useCallback(() => {
    return (
      <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.screenContent}>
        <BackButton
          title={i18n.t('About')}
          onPress={() => ScreenManager.popScreen(router)}
        />
        <TextView>{data.text}</TextView> 
        <Divider />
  
        <BottomLinks />
      </BoxView>
    );
  }, [router, data]);

  return renderComponent();
};

export default AboutSection;
