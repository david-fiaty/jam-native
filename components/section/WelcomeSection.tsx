import { StyleSheet, View } from 'react-native';
import { Divider } from '@rneui/base';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import TextSlideshow from '../slideshow/TextSlideshow';
import StaticData from '@/constants/StaticData';
import BottomLinks from './navigation/BottomLinks';
import BoxView from '../view/BoxView';

const WelcomeSection = () => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <LogoView size={110} />

      <TextSlideshow data={StaticData.welcomeSlideshow} />

      <LoginSignupButton />

      <Divider /><Divider />
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});


export default WelcomeSection;