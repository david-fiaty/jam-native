import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Slideshow from '@/components/slideshow/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '../images/JamLogo';
import LoginSignupButton from '../buttons/LoginSignupButton';
import SkipButton from '../buttons/SkipButton';
import ScreenView from '@/components/base/ScreenView';
import { StaticIcon } from '../base/StaticIcon';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScreenView>
      <StaticIcon name="location" iconStyle={{color: 'red'}} />
        <JamLogo width={110} height={110} />    
        <Slideshow />
        <LoginSignupButton />
        <SkipButton onPress={() => router.push('/jams')} />
        <BottomLinks />
      </ScreenView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default WelcomeScreen;