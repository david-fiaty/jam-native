import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import WelcomeScreen from '@/components/screen/WelcomeScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <WelcomeScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
