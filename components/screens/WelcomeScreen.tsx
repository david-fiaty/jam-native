import { View, StyleSheet } from 'react-native';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '../images/JamLogo';
import LoginSignupButton from '../buttons/LoginSignupButton';
import FullScreenView from '@/components/base/FullScreenView';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <FullScreenView>
        <JamLogo width={110} height={110} />    
        <Slideshow />
        <LoginSignupButton />
        <BottomLinks />
      </FullScreenView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default WelcomeScreen;