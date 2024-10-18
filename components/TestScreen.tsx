import React, { useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import DeviceManager from '@/classes/DeviceManager';



const TestScreen = () => {
  const { height } = DeviceManager.window; 
  const slideAnim = useRef(new Animated.Value(height)).current; 
  
  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: -height, 
      duration: 300, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button title="Slide Up" onPress={slideIn} />

      <Animated.View
        style={[
          styles.animatedView,
          { transform: [{ translateY: slideAnim }] }, 
        ]}
      >
        <View style={styles.content}>
          <Button title="Slide Down" onPress={slideOut} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  animatedView: {
    position: 'absolute',
    width: DeviceManager.window.width,
    left: 0,
    backgroundColor: 'lightblue',
    top: DeviceManager.window.height,
    height: DeviceManager.modal.height - GlobalStyles.header.height + GlobalStyles.space.base,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;
