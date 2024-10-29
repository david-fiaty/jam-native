import { View, StyleSheet } from 'react-native';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import { Divider } from '@rneui/base';
import WelcomeSlideshow from '../welcome-slideshow/WelcomeSlideshow';
import SlideshowView from '../view/SlideshowView';

const WelcomeScreen = () => {
  return (
    <BoxView direction="column" align="center" justify="center" style={styles.container}>
      <LogoView size={{ width: 110, height: 110 }} />    
      
      <SlideshowView />
      <Divider />
      <WelcomeSlideshow />

      <Divider />
      <LoginSignupButton />
      
      <Divider />
      <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default WelcomeScreen;