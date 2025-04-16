import { ThemeProvider } from '@rneui/themed';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import WelcomeScreen from '@/components/screen/WelcomeScreen';
import { Stack, useSegments, useRouter, Link } from 'expo-router';
import { Button } from '@rneui/base';



export default () => {

  const router = useRouter();

  
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <WelcomeScreen />
      
        <Link href="/test/foo">Login</Link>
        <Button title={'test'} onPress={() => router.push('/test/xooo')} />
      </ScreenView>
    </ThemeProvider>
  );
}
