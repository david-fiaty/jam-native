import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import NotificationScreen from '@/components/screen/NotificationScreen';

export default () => {
  const { entityId } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <NotificationScreen entityId={entityId} />
      </ScreenView>
    </ThemeProvider>
  );
}

