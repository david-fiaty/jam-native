import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import JamScreen from "@/components/screen/JamScreen";

export default () => {
  const { entityId } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <JamScreen entityId={entityId} />
      </ScreenView>
    </ThemeProvider>
  );
}
