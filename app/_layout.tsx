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

const screenOptions: object = { 
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
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="login" options={{headerShown: false, animation:'fade'}} />
        <Stack.Screen name="signup" options={{headerShown: false, animation:'fade'}} />
        <Stack.Screen name="about" options={screenOptions} />
        <Stack.Screen name="legal" options={screenOptions} />
        <Stack.Screen name="main" options={screenOptions} />
        <Stack.Screen name="account" options={screenOptions} />
        <Stack.Screen name="password" options={screenOptions} />
        <Stack.Screen name="language" options={screenOptions} />
        <Stack.Screen name="notification" options={screenOptions} />
      </Stack>
    </Provider>
  );
}

export default RootLayout;