import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';

const SplashScreen = () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <BoxView direction="column" align="center" justify="center" style={styles.container}>
          <LogoView size={{ width: 110, height: 110 }} />    
        </BoxView> 
      </ScreenView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default SplashScreen;