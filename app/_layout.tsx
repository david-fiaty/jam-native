import { useEffect } from 'react';
import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import * as ExpoSplashScreen from 'expo-splash-screen';
import BaseTheme from "@/constants/BaseTheme";
import Store from "@/redux/Store";
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import SplashScreen from '@/components/screen/SplashScreen';
import MessageView from '@/components/view/MessageView';

const headerHiddenOptions: object = { 
  headerShown: false,
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

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const segments = useSegments(); 
  const [isLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const routes = [
    {
      name: 'index',
      options: {
        ...headerHiddenOptions,
        ...{
          animation: 'default',
        },
      },
    },
    {
      name: 'login',
      options: {
        ...headerHiddenOptions,
        ...{
          animation: !segments.length ? 'default' : 'fade',
        },
      },
    },
    {
      name: 'signup',
      options: {
        ...headerHiddenOptions,
        ...{
          animation: !segments.length ? 'default' : 'fade',
        },
      },
    },
    {
      name: 'about',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: !segments.length ? 'default' : 'fade',
        },
      },
    },
    {
      name: 'legal',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: !segments.length ? 'default' : 'fade',
        },
      },
    },
    {
      name: 'jams',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: 'fade',
        },
      },
    },
    {
      name: 'account',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: 'default',
        },
      },
    },
    {
      name: 'password',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: 'default',
        },
      },
    },
    {
      name: 'language',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: 'default',
        },
      },
    },
    {
      name: 'notification',
      options: {
        ...headerVisibleOptions,
        ...{
          animation: 'default',
        },
      },
    },
  ];

  useEffect(() => {
    if (isLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) return <SplashScreen /> 

  return (
    <Provider store={Store}>
      <MessageView />
      <Stack>
        {routes.map((item: any) => (
          <Stack.Screen 
            key={item.name}
            name={item.name} 
            options={item.options} 
          />
        ))}
      </Stack>
    </Provider>
  );
}

export default RootLayout;