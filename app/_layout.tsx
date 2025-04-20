import React, { useEffect } from 'react';
import { Stack, useSegments, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import * as ExpoSplashScreen from 'expo-splash-screen';
import Store from "@/redux/Store";
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments(); 

  const defaults: any = Platform.OS == 'ios' ? {
    headerShown: false,
  } : { 
    statusBarStyle: 'dark',
    animation: 'fade',
    headerShown: false,
    statusBarBackgroundColor: Colors.white,
    headerTintColor: Colors.white,    
    headerStyle: {
      backgroundColor: Colors.white, 
    },
  };

  const navigation: any = {
    showHeader: true,
    showFooter: true,
    showHeaderButtons: true,
    showHeaderSearch: true,
    isRoot: false,
  };

  const [isLoaded, isError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (isLoaded || isError) {
      ExpoSplashScreen.hideAsync();
    }

  }, [isLoaded, isError]);

  if (!isLoaded && !isError) return <></>; 

  return (
    <Provider store={Store}>
      <Stack>
        <Stack.Screen name="index" options={{ ...defaults, ...navigation }} />
        <Stack.Screen name="[sectionId]" options={{ ...defaults, ...navigation }} />
      </Stack>
    </Provider>
  );
}

export default RootLayout;