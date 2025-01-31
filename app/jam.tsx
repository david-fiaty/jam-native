import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import JamScreen from "@/components/screen/JamScreen";

export default () => {
  const { idArray, title } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <JamScreen idArray={idArray} title={title} />
      </ScreenView>
    </ThemeProvider>
  );
}
