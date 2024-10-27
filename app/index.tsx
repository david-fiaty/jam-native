import { View } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import MainScreen from '@/components/screen/MainScreen';

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <View>
          <MainScreen />
        </View>
      </ScreenView>
    </ThemeProvider>
  );
}
