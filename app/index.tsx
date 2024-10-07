import { View, StyleSheet } from 'react-native';
import Carousel from '../components/carousel/Controller';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { StaticImage } from '@/components/StaticImage';
import SkipButton from '@/components/buttons/SkipButton';
import LoginButton from '@/components/buttons/LoginButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import BottomTabs from '@/components/navigation/BottomTabs';

const Index = () => {
  return (  
    <View style={styles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={110} height={110} />    
      <Carousel />
      <LoginButton />
      <SkipButton />
      <BottomLinks />
      <BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: GlobalStyles.container,
});

export default Index;
