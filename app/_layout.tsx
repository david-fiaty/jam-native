import 'react-native-reanimated';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Colors } from '@/constants/GlobalStyles';
import HeaderBar from '@/components/navigation/HeaderBar';

const headerOptions = { 
  header: (props: object) => <HeaderBar />,    
  headerShown: true,
  statusBarColor: Colors.background,
  statusBarStyle: 'dark',
  headerTintColor: Colors.background,    
  headerStyle: {
    backgroundColor: Colors.background, 
  },
};

const fadeAnimationOptions = {  
  animation: 'fade',
  animationDuration: 2000,
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{...headerOptions, ...fadeAnimationOptions }} />
        <Stack.Screen name="jams" options={{...headerOptions, ...fadeAnimationOptions }} />
        <Stack.Screen name="add-jam" options={{...headerOptions, ...fadeAnimationOptions }} />
        <Stack.Screen name="profile" options={{...headerOptions, ...fadeAnimationOptions }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="legal" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="username" options={{ headerShown: false }} />
        <Stack.Screen name="language" options={{ headerShown: false }} />
        <Stack.Screen name="map" options={{...headerOptions, ...fadeAnimationOptions }} />
      </Stack>
    </ThemeProvider>
  );
}
