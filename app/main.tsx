import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";

import MainScreen from '@/components/screen/MainScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <MainScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
