import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import * as ExpoFont from 'expo-font';
import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import SplashScreen from '@/components/screen/SplashScreen';
import MainScreen from '@/components/screen/MainScreen';

ExpoSplashScreen.preventAutoHideAsync();

export default () => {
  const [isAppReady, setExpoSplashScreenIsReady] = useState(false);
  const onLayoutReady = useCallback(async () => {
    if (isAppReady) await ExpoSplashScreen.hideAsync();
  }, [isAppReady]);

  useEffect(() => {
    async function prepare() {
      try {
        await ExpoFont.loadAsync({
          // Todo - Enable font
          //'BaseFont': require('../assets/fonts/SpaceMono-Regular.ttf'),
          //'BaseFont': require('../assets/fonts/HelveticaNeueLight.otf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setExpoSplashScreenIsReady(true);
      }
    }

    prepare();
  }, []);

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        {!isAppReady ? (<SplashScreen />) : (
          <View onLayout={onLayoutReady}>
            <MainScreen />
          </View>
        )}
      </ScreenView>
    </ThemeProvider>
  );
}
