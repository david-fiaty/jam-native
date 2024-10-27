import { View, StyleSheet } from 'react-native';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '../button/LoginSignupButton';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';

const WelcomeScreen = () => {
  return (
    <BoxView direction="column" align="flex-start" justify="center">
        <LogoView size={{ width: 110, height: 110 }} />    
        
        <LoginSignupButton />
        <BottomLinks />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default WelcomeScreen;