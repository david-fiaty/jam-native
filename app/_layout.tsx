import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Store from "@/redux/Store";
import { Colors } from '@/constants/Colors';

const screenOptions = { 
  headerShown: false,
  statusBarColor: Colors.background,
  statusBarStyle: 'dark',
};

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <Stack>
        <Stack.Screen name="index" options={screenOptions} />
      </Stack>
    </Provider>
  );
}
