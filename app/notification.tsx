import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import NotificationScreen from '@/components/screen/NotificationScreen';

export default () => {
  const { item } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <NotificationScreen item={item} />
      </ScreenView>
    </ThemeProvider>
  );
}
