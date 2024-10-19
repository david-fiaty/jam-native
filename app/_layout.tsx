import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
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

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
