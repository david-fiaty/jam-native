import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as ExpoSplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Keep the splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

export default function SplashScreen() {
  const [appIsReady, setSplashScreenIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setSplashScreenIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutReady = useCallback(async () => {
    if (appIsReady) await ExpoSplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View onLayout={onLayoutReady}>

      {!appIsReady ? (<Text>ExpoSplashScreen Demo! 👋</Text>) : (<Entypo name="rocket" size={30} />)}
      
    </View>
  );
}
