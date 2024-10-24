import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';


const screenOptions = { 
  header: (props: object) => <HeaderNavigation />,    
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
    <Stack>
      <Stack.Screen name="index" options={screenOptions} />
    </Stack>
  );
}
