import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import ProjectScreen from "@/components/screen/ProjectScreen";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import FooterNavigation from "@/components/navigation/FooterNavigation";

export default () => {
  const { idArray, title } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <ProjectScreen idArray={idArray} title={title} />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
