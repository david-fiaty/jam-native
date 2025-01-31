import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import MainScreen from '@/components/screen/MainScreen';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import FooterNavigation from '@/components/navigation/FooterNavigation';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <MainScreen />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
