import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemeProvider } from '@rneui/themed';
import ScreenView from '@/components/view/ScreenView';
import BaseTheme from "@/constants/BaseTheme";
import NotificationScreen from '@/components/screen/NotificationScreen';

export default () => {
  const { params } = useLocalSearchParams();
  
  console.log(params);

  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <NotificationScreen item={} />
      </ScreenView>
    </ThemeProvider>
  );
}
