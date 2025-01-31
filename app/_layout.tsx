import React, { useEffect, useCallback } from 'react';
import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import * as ExpoSplashScreen from 'expo-splash-screen';
import Store from "@/redux/Store";
import RouteConfig from '@/constants/RouteConfig';
import ModalConfig from '@/constants/ModalConfig';
import ModalView from '@/components/view/ModalView';
import MessageView from '@/components/view/MessageView';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const segments = useSegments(); 
  const routes: any = RouteConfig.getRoutes(segments);
  const modalConfig: any = ModalConfig.build();

  const [isLoaded, isError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const loadModalConfig = useCallback(() => {
    Store.dispatch(setModalConfig(modalConfig.map(({ component, ...rest }) => ({ ...rest }))));
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
      <MessageView />

      <Stack>
        {routes.map((o: any) => (
          <Stack.Screen 
            key={o.name}
            name={o.name} 
            options={o}
          />
        ))}
      </Stack>

      <ModalView />
    </Provider>
  );
}

export default RootLayout;