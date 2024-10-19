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
  const [appIsReady, setExpoSplashScreenIsReady] = useState(false);
  const onLayoutReady = useCallback(async () => {
    if (appIsReady) await ExpoSplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        await ExpoFont.loadAsync({
          'BaseFont': require('../assets/fonts/HelveticaNeueLight.otf'),
        });

        //await new Promise(resolve => setTimeout(resolve, 3000));
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
        {!appIsReady ? (<SplashScreen />) : (
          <View onLayout={onLayoutReady}>
            <MainScreen />
          </View>
        )}
      </ScreenView>
    </ThemeProvider>
  );
}
