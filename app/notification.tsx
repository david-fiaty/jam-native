import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import NotificationScreen from '@/components/screen/NotificationScreen';
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import FooterNavigation from "@/components/navigation/FooterNavigation";

export default () => {
  const { entityId } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <HeaderNavigation />
        <NotificationScreen entityId={entityId} />
        <FooterNavigation />
      </ScreenView>
    </ThemeProvider>
  );
}
