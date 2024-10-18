import React, { useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window'); 

const TestScreen = () => {
  const slideAnim = useRef(new Animated.Value(height)).current; 

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, 
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
    <View style={styles.container}>
      <Button title="Slide Up" onPress={slideIn} />
      <Button title="Slide Down" onPress={slideOut} />

      <Animated.View
        style={[
          styles.animatedView,
          { transform: [{ translateY: slideAnim }] }, 
        ]}
      >
        <View style={styles.content}>
          <Button title="Content Inside" onPress={() => {}} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  animatedView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300, // Adjust the height as needed
    backgroundColor: 'lightblue',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;
