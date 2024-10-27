import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import TextView from '@/components/view/TextView';
import LoginScreen from '@/components/screen/LoginScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <LoginScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
