import { ThemeProvider } from '@rneui/themed';
import ViewportContainer from "@/components/base/ViewportContainer";
import SplashScreen from "@/components/screen/SplashScreen";
import BaseTheme from "@/constants/BaseTheme";

export default () => {
  return (  
    <ThemeProvider theme={BaseTheme}>
      <ViewportContainer>
        <SplashScreen />
      </ViewportContainer>
    </ThemeProvider>
  );
};
