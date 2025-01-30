import React, { useEffect } from 'react';
import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import * as ExpoSplashScreen from 'expo-splash-screen';
import BaseTheme from "@/constants/BaseTheme";
import Store from "@/redux/Store";
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import RouteConfig from '@/constants/RouteConfig';

const headerHiddenOptions: object = { 
  headerShown: false,
};

const headerOptions: object = { 
  statusBarStyle: 'dark',
  headerShown: false,
  statusBarBackgroundColor: Colors.white,
  headerTintColor: Colors.white,    
  headerStyle: {
    backgroundColor: Colors.white, 
  },
};

const headerVisibleOptions: object = { 
  statusBarStyle: 'dark',
  headerShown: true,
  statusBarBackgroundColor: Colors.white,
  headerTintColor: Colors.white,    
  headerStyle: {
    backgroundColor: Colors.white, 
  },
  header: (props: object) => (
    <ThemeProvider theme={BaseTheme}>
      <HeaderNavigation />
    </ThemeProvider>
  ),    
};

const statusBarVisibleOptions: object = { 
  statusBarStyle: 'dark',
  headerShown: false,
  statusBarBackgroundColor: Colors.white,
};

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const segments = useSegments(); 
  const [isLoaded, isError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const routes = RouteConfig.build(segments);

  useEffect(() => {
    if (isLoaded || isError) {
      ExpoSplashScreen.hideAsync();
    }
  }, [isLoaded, isError]);

  if (!isLoaded && !isError) return <></>; 

  return (
    <Provider store={Store}>
      <Stack>
        {routes.map((item: any) => (
          <Stack.Screen 
            key={item.name}
            name={item.name} 
            //options={item.options} // Todo - Apply or remove
            options={headerOptions}
          />
        ))}
      </Stack>
    </Provider>
  );
}

export default RootLayout;