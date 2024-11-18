import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import JamsScreen from '@/components/screen/JamsScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <JamsScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
