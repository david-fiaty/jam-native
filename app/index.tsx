import { ThemeProvider } from '@rneui/themed';
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';
import BaseTheme from "@/constants/BaseTheme";
import ScreenView from '@/components/view/ScreenView';
import WelcomeScreen from '@/components/screen/WelcomeScreen';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3 ,
  retryDelay: 3000,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

export default () => {
  return ( 
    <ThemeProvider theme={BaseTheme}>
      <ScreenView>
        <WelcomeScreen />
      </ScreenView>
    </ThemeProvider>
  );
}
