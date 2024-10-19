import { ThemeProvider } from '@rneui/themed';
import ViewportContainer from "@/components/base/ViewportContainer";
import SplashScreen from "@/components/screen/SplashScreen";
import BaseTheme from "@/constants/BaseTheme";

const Index = () => {
  return (  
    <ThemeProvider theme={BaseTheme}>
      <ViewportContainer>
        <SplashScreen />
      </ViewportContainer>
    </ThemeProvider>
  );
};

export default Index;