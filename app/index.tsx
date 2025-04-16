import { useGlobalSearchParams } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import SectionView from '@/components/view/SectionView';
import { View, StyleSheet } from 'react-native';
import BottomLinks from '@/components/navigation/BottomLinks';
import LoginSignupButton from '@/components/button/LoginSignupButton';
import LogoView from '@/components/view/LogoView';
import BoxView from '@/components/view/BoxView';
import { Divider } from '@rneui/base';
import TextSlideshow from '@/components/slideshow/TextSlideshow';
import StaticData from '@/constants/StaticData';

export default () => {
  const { section } = useGlobalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <BoxView direction="column" align="center" justify="center" style={styles.container}>
        <LogoView size={110} />    
      
        <TextSlideshow data={StaticData.welcomeSlideshow} />

        <Divider />
        <LoginSignupButton />
        
        <Divider /><Divider />
        <BottomLinks />
      </BoxView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

