import { ThemeProvider, createTheme } from '@rneui/themed';
import ViewportContainer from "@/components/base/ViewportContainer";
import SplashScreen from "@/components/screen/SplashScreen";

const Index = () => {
  return (  
    <ViewportContainer>
      <SplashScreen />
    </ViewportContainer>
  );
};

export default Index;