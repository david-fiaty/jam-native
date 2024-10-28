import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import LegalScreen from '@/components/screen/LegalScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <LegalScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
