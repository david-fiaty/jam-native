import { Animated } from 'react-native';
import DeviceManager from '@/classes/DeviceManager';

class ScreenAnimation {
  slideIn(reference: Animated.Value) {
    return Animated.timing(reference, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true, 
    });
  }

  slideOut(reference: Animated.Value) {
    return Animated.timing(reference, {
      toValue: DeviceManager.window.height, 
      duration: 300,
      useNativeDriver: true,
    });
  }

  fadeIn(reference: Animated.Value) {
    return Animated.timing(reference, {
      toValue: 1, 
      duration: 300, 
      useNativeDriver: true, 
    });
  }


  fadeOut(reference: Animated.Value) {
    return Animated.timing(reference, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true, 
    });
  }

  pushIn(reference: Animated.Value) {
    return Animated.timing(reference, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true, 
    });
  }


  pushOut(reference: Animated.Value) {
    return Animated.timing(reference, {
      toValue: DeviceManager.window.width, 
      duration: 300, 
      useNativeDriver: true, 
    });
  }


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
          toValue: 1, 
          duration: 300, 
          useNativeDriver: true, 
        });
      },
      out: (axis?: string) => {
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