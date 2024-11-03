import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import * as ExpoFont from 'expo-font';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import BaseTheme from "@/constants/BaseTheme";
import Store from "@/redux/Store";
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import SplashScreen from '@/components/screen/SplashScreen';

const headerHiddenOptions: object = { 
  headerShown: false,
};

const headerVisibleOptions: object = { 
  header: (props: object) => (
    <ThemeProvider theme={BaseTheme}>
      <HeaderNavigation />
    </ThemeProvider>
  ),    
  headerShown: true,
  statusBarColor: Colors.background,
  statusBarStyle: 'dark',
  headerTintColor: Colors.background,    
  headerStyle: {
    backgroundColor: Colors.background, 
  },
};

const routes = [
  {
    name: 'index',
    options: {
      ...headerHiddenOptions,
      ...{
        animation: 'fade',
      },
    },
  },
  {
    name: 'login',
    options: {
      ...headerHiddenOptions,
      ...{
        animation: 'fade',
      },
    },
  },
  {
    name: 'signup',
    options: {
      ...headerHiddenOptions,
      ...{
        animation: 'fade',
      },
    },
  },
  {
    name: 'about',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
  {
    name: 'legal',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
  {
    name: 'jams',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
  {
    name: 'account',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
  {
    name: 'password',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
  {
    name: 'language',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
  {
    name: 'notification',
    options: {
      ...headerVisibleOptions,
      ...{},
    },
  },
];

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (isLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) return <SplashScreen /> 

  return (
    <Provider store={Store}>
      <Stack>
        {routes.map((item: any) => <Stack.Screen name={item.name} options={item.options} />)}
      </Stack>
    </Provider>
  );
}

export default RootLayout;