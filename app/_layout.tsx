import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Store from "@/redux/Store";
import { Colors } from '@/constants/Colors';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';

const screenOptions = { 
  header: (props: object) => <HeaderNavigation />,    
  headerShown: true,
  headerMode: 'float',
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
        <Stack.Screen name="notification" options={screenOptions} />
      </Stack>
    </Provider>
  );
}
