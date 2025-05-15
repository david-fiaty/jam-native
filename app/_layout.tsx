import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { Platform, BackHandler } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import Store from "@/redux/Store";
import SectionManager from '@/manager/SectionManager';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();

  const defaults: any = Platform.OS == 'ios' ? {
    headerShown: false,
  } : { 
    statusBarStyle: 'dark',
    animation: 'fade',
    headerShown: false,
    statusBarBackgroundColor: Layout.colors.white,
    headerTintColor: Layout.colors.white,    
    headerStyle: {
      backgroundColor: Layout.colors.white, 
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

  const backAction = () => {  
    SectionManager.back(router);
    return true;
  };

  useEffect(() => {
    if (isLoaded || isError) {
      ExpoSplashScreen.hideAsync();
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
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