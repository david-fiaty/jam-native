import { useEffect } from 'react';
import { ThemeProvider } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { setScreenState } from '@/redux/slices/ScreenSlice';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import WelcomeScreen from '@/components/screen/WelcomeScreen';

export default () => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    //dispatch(setScreenState());
  }, []);

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <WelcomeScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
