import React, { useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { Stack, useSegments, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { setRouteConfig } from '@/redux/slices/RouteSlice';
import * as ExpoSplashScreen from 'expo-splash-screen';
import Store from "@/redux/Store";
import RouteConfig from '@/constants/RouteConfig';
import ModalConfig from '@/constants/ModalConfig';
import ScreenManager from '@/manager/ScreenManager';
import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';
import { Platform } from 'react-native';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments(); 
  const routeConfig: any = RouteConfig.getRoutes(segments);
  const modalConfig: any = ModalConfig.build();

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

  const loadModalConfig = useCallback(() => {
    Store.dispatch(setModalConfig(modalConfig.map(({ component, ...rest }) => ({ ...rest }))));
    Store.dispatch(setRouteConfig(routeConfig));
  }, [modalConfig]);

  useEffect(() => {
    loadModalConfig();

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