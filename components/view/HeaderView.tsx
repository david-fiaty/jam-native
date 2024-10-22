import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, StatusBar } from 'react-native';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';
import DeviceManager from '@/classes/DeviceManager';

export default ({style, children}: BaseProps) => {
  const windowHeight = DeviceManager.window.height;
  const slideAnim = useRef(new Animated.Value(windowHeight)).current; 

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  // Function to hide the view again
  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: windowHeight, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <BoxView direction="row" align="center" justify="space-between" style={styles.container}>
      <BoxView direction="row" align="center" style={styles.left}>
        <TouchableOpacity onPress={() => {}}>
          <LogoView size={{width: 48, height: 48}} />
        </TouchableOpacity>
      </BoxView>
      <BoxView direction="row" align="center" justify="space-between">
        <BoxView direction="row" align="center" style={styles.right}> 
          <IconView name="menu" theme="secondary" size={22} onPress={() => {}} />
          <IconView label="15+" theme="secondary" size={13} onPress={() => {}} />
          <IconView name="search" theme="clear" size={22} onPress={() => {}} />
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: Layout.space.base,
  },
  left: {
    gap: Layout.space.base,
  },
  right: {
    flexDirection: 'row',
    gap: Layout.space.base,
  },
});
