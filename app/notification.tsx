import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import TextView from "@/components/view/TextView";
import BaseTheme from "@/constants/BaseTheme";

export default () => {

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <TextView>Notification</TextView>
      </ScreenView>
    </ThemeProvider>
  );
}
