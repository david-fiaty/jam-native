import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import ProjectScreen from "@/components/screen/ProjectScreen";

export default () => {
  const { idArray, title } = useLocalSearchParams();

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <ProjectScreen idArray={idArray} title={title} />
      </ScreenView>
    </ThemeProvider>
  );
}
