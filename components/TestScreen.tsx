import React, { useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window'); // Get the height of the screen

const TestScreen = () => {
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position is off-screen (bottom)

  // Function to start the animation
  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to top of the screen (or the original position)
      duration: 500, // Animation duration in ms
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // Function to hide the view again
  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: height, // Slide out to bottom of the screen
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
          { transform: [{ translateY: slideAnim }] }, // Bind translateY to the animated value
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
