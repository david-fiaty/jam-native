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

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments(); 
  const routeConfig: any = RouteConfig.getRoutes(segments);
  const modalConfig: any = ModalConfig.build();

  const [isLoaded, isError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const backAction = () => {  
    ScreenManager.toggleModal(null);
    router.replace('/');

    // Todo - Set new active route in to fix bug
    /*
    let activeRoutes: any = [...Store.getState().route.active].pop();
    ScreenManager.toggleModal(null);
    
    if (Array.isArray(activeRoutes) && activeRoutes.length > 0) {
      router.dismissTo(activeRoutes[activeRoutes.length - 1]);
    }
    else if (activeRoutes.length > 0) {
      router.replace(activeRoutes);
    }
    else {
      router.replace('/');
    }
    */

    return true;
  };

  const loadModalConfig = useCallback(() => {
    Store.dispatch(setModalConfig(modalConfig.map(({ component, ...rest }) => ({ ...rest }))));
    Store.dispatch(setRouteConfig(routeConfig));
  }, [modalConfig]);

  useEffect(() => {
    loadModalConfig();

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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[section]" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

export default RootLayout;