import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import JamScreen from "@/components/screen/JamScreen";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import FooterNavigation from "@/components/navigation/FooterNavigation";

export default () => {
  const { idArray, title } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <JamScreen idArray={idArray} title={title} />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
