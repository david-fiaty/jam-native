import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '../images/JamLogo';
import LoginSignupButton from '../buttons/LoginSignupButton';
import ScreenView from '@/components/base/ScreenView';
import SquareSelectList from '../fields/RadioGroup';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenView>
        <SquareSelectList />
        <JamLogo width={110} height={110} />    
        <Slideshow />
        <LoginSignupButton />
        <BottomLinks />
      </ScreenView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default WelcomeScreen;