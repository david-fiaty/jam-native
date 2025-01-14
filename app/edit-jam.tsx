import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import JamForm from "@/components/form/JamForm";

export default () => {
  //const { idArray, title } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <JamForm />
      </ScreenView>
    </ThemeProvider>
  );
}
