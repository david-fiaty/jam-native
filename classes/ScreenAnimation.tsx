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
      toValue: -DeviceManager.window.width, 
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
};

export default (new ScreenAnimation());