import { Animated } from 'react-native';
import DeviceManager from '@/classes/DeviceManager';

class ScreenAnimation {
  slide(effect: Animated.Value) {
    return {
      in: (axis?: string) => {
        return Animated.timing(effect, {
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
      out: (axis?: string) => {
        return Animated.timing(effect, {
          toValue: DeviceManager.window.height, 
          duration: 300,
          useNativeDriver: true,
        });
      },
    };
  }

  fade(effect: Animated.Value, axis?: string) {
    return {
      in: (axis?: string) => {
        return Animated.timing(effect, {
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
      out: (axis?: string) => {
        return Animated.timing(effect, {
          toValue: DeviceManager.window.width, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
    };
  }

  push(effect: Animated.Value) {
    return {
      in: (axis?: string) => {
        return Animated.timing(effect, {
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
      out: (axis?: string) => {
        return Animated.timing(effect, {
          toValue: DeviceManager.window.height, 
          duration: 300,
          useNativeDriver: true,
        });
      },
    };
  }
};

export default (new ScreenAnimation());