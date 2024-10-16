import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Button, View, Text, StatusBar } from 'react-native';
import TextBlock from '@/components/base/TextBlock';
import HeaderBar from '@/components/navigation/HeaderBar';

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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="legal" options={{ headerShown: false }} />
        <Stack.Screen name="jams" options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: 'gray', 
          },
          headerTintColor: '#fff',   
          headerTitleStyle: {
            fontWeight: 'bold',          
          }, 

          header: (props) => (
            <HeaderBar />
          ),     
               
        }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="username" options={{ headerShown: false }} />
        <Stack.Screen name="language" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
