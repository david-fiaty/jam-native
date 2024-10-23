import { Stack } from 'expo-router';
import HeaderView from '@/components/view/HeaderView';
import { Colors } from '@/constants/Colors';
/*
const screenOptions = { 
  header: (props: object) => <HeaderView />,    
  headerShown: true,
  statusBarColor: Colors.background,
  statusBarStyle: 'dark',
  headerTintColor: Colors.background,    
  headerStyle: {
    backgroundColor: Colors.background, 
  },
};
*/

const screenOptions = { 
  headerShown: false,
  statusBarStyle: 'dark',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={screenOptions} />
    </Stack>
  );
}
