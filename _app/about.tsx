import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import AboutScreen from '@/components/screen/AboutScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <AboutScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
