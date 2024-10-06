import { View, StyleSheet } from 'react-native';
import Carousel from '../components/carousel/Controller';
import { GlobalStyles } from '@/constants/GlobalStyles';
import SkipButton from '@/components/buttons/SkipButton';
import LoginButton from '@/components/buttons/LoginButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '@/components/JamLogo';

const Index = () => {
  return (  
    <View style={styles.container}>
      <JamLogo width={110} height={110} />
      <Carousel />
      <LoginButton />
      <SkipButton />
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: GlobalStyles.container,
});

export default Index;
