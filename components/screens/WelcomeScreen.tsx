import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/GlobalStyles';
import Slideshow from '@/components/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '../images/JamLogo';
import LoginSignupButton from '../buttons/LoginSignupButton';
import SkipButton from '../buttons/SkipButton';


const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <JamLogo width={110} height={110} />    
      <Slideshow />
      <LoginSignupButton />
      <SkipButton onPress={() => router.push('/jams')} />
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
  },
});

export default WelcomeScreen;