import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import SignupScreen from '@/components/screen/SignupScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <SignupScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
