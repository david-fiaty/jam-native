import React, { useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet, Dimensions } from 'react-native';
import BoxView from './BoxView';
import { BaseProps } from '@/constants/Types';
import DeviceManager from '@/classes/DeviceManager';

const height = DeviceManager.window.height;

export default ({style, children}: BaseProps) => {
  return (
    <BoxView style={[styles.container, style]}>
      {children}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});
