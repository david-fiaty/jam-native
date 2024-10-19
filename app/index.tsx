import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Button } from '@rneui/themed';
import { ThemeProvider } from '@rneui/themed';
import Entypo from '@expo/vector-icons/Entypo';
import ViewportContainer from "@/components/base/ViewportContainer";
import BaseTheme from "@/constants/BaseTheme";


// Keep the splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

export default () => {
  const [appIsReady, setExpoSplashScreenIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setExpoSplashScreenIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutReady = useCallback(async () => {
    if (appIsReady) await ExpoSplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View onLayout={onLayoutReady}>
  
        <Text>ExpoSplashScreen Demo! 👋</Text>
        
      </View>
    );
  }

  return (
    <ThemeProvider theme={BaseTheme}>
      <ViewportContainer>
        <Button title="My Button" titleStyle={{ color: 'pink' }} />
      </ViewportContainer>
    </ThemeProvider>
  );
}
