import React, { useRef } from 'react';
import { Button, Animated, StyleSheet } from 'react-native';
import BoxView from './BoxView';
import { BaseProps } from '@/constants/Types';
import DeviceManager from '@/classes/DeviceManager';

const height = DeviceManager.window.height;

type Props = BaseProps & {
  component: JSX.Element,
  
};

export default ({style, children}: BaseProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current; 

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 100, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: height, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Button title="Slide Up" onPress={slideIn} />
      <Button title="Slide Down" onPress={slideOut} />

      <Animated.View style={[
        styles.animatedView,
        { transform: [{ translateY: slideAnim }] }, 
      ]}>
        <BoxView style={[styles.container, style]}>
          {children}
        </BoxView>
      </Animated.View>

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
  animatedView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 500, 
    backgroundColor: 'lightblue',
  },
});
