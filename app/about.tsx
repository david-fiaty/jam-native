import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import TextView from '@/components/view/TextView';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <TextView>About</TextView>
      </ScreenView>
    </ThemeProvider>
  );
}
