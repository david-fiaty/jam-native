import React, { useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { setRouteConfig } from '@/redux/slices/RouteSlice';
import * as ExpoSplashScreen from 'expo-splash-screen';
import Store from "@/redux/Store";
import RouteConfig from '@/constants/RouteConfig';
import ModalConfig from '@/constants/ModalConfig';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const segments = useSegments(); 
  const routeConfig: any = RouteConfig.getRoutes(segments);
  const modalConfig: any = ModalConfig.build();

  const [isLoaded, isError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const backAction = () => {
      console.log('back pressed');
      // Todo - Implement back action logic + reset active modal stack

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
        {routeConfig.map((o: any) => (
          <Stack.Screen 
            key={o.name}
            name={o.name} 
            options={o}
          />
        ))}
      </Stack>
    </Provider>
  );
}

export default RootLayout;