import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import { Divider } from '@rneui/base';
import BackButton from '../button/BackButton';
import BottomLinks from '../navigation/BottomLinks';

const data = {
  title: 'About',
  text: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  ],
};

const LegalScreen = () => {
  const navigation = useNavigation();

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('About')}
        onPress={() => navigation.popToTop()}
      />
      <TextView>{data.text}</TextView> 
      <Divider />
      
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
});

export default LegalScreen;
