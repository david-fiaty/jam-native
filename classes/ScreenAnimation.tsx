import { Animated } from 'react-native';
import DeviceManager from '@/classes/DeviceManager';

class ScreenAnimation {
  slide(effect: Animated.Value) {
    return {
      in: () => {
        return Animated.timing(effect, {
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
      out: () => {
        return Animated.timing(effect, {
          toValue: DeviceManager.window.height, 
          duration: 300,
          useNativeDriver: true,
        });
      },
    };
  }

  fade(effect: Animated.Value) {
    return {
      in: () => {
        return Animated.timing(effect, {
          toValue: 1, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
      out: () => {
        return Animated.timing(effect, {
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
    };
  }
};

export default (new ScreenAnimation());