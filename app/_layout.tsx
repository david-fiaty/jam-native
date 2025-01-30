import React, { useEffect } from 'react';
import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import * as ExpoSplashScreen from 'expo-splash-screen';
import Store from "@/redux/Store";
import RouteConfig from '@/constants/RouteConfig';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const segments = useSegments(); 
  const routes: any = RouteConfig.getRoutes(segments);
  
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
        {routes.map((o: any) => (
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