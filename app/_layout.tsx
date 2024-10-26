import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import BaseTheme from "@/constants/BaseTheme";
import Store from "@/redux/Store";
import HeaderNavigation from '@/components/navigation/HeaderNavigation';

const screenOptions = { 
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

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <Stack>
        <Stack.Screen name="index" options={screenOptions} />
        <Stack.Screen name="account" options={screenOptions} />
        <Stack.Screen name="password" options={screenOptions} />
        <Stack.Screen name="language" options={screenOptions} />
        <Stack.Screen name="notification" options={screenOptions} />
      </Stack>
    </Provider>
  );
}
