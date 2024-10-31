import { ThemeProvider } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import WelcomeScreen from '@/components/screen/WelcomeScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <WelcomeScreen />
      </ScreenView>
      <Toast />
    </ThemeProvider>
  );
}
