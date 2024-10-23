import { Stack } from 'expo-router';

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
