import { useEffect } from 'react';
import { ThemeProvider } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { setScreenState } from '@/redux/slices/ScreenSlice';
import { Screens } from '@/constants/Screens';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import WelcomeScreen from '@/components/screen/WelcomeScreen';

export default () => {
  const dispatch = useDispatch(); 
  const screens = Screens.map((item: any) => {
    delete item['component'];
    return item;
  });

  useEffect(() => {
    dispatch(setScreenState(screens));
  }, []);

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <WelcomeScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
