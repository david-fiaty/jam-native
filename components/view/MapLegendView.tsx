
import React, { useRef, useState } from "react";
import { Text, Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import TextView from "./TextView";

type Props = {

};

const MapLegendView = ({ }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current;

  const toggleLegend = () => {
    Animated.timing(widthAnim, {
      toValue: isVisible ? 0 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsVisible(!isVisible);
  };

  return (
    <>
      {!isVisible && (
        <TouchableOpacity
          style={styles.openButton}
          onPress={toggleLegend}
        >
          <IconView
            name="right"
            theme="transparent"
          />
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.legendContainer, { width: widthAnim }]}>
        <TextView>Expanding Box</TextView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={toggleLegend}
        >
          <IconView
            name="left"
            theme="transparent"
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
  openButton: {
    position: 'absolute',
    bottom: Layout.space.base * 5,
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base / 2,
    height: 30,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base / 2,
    height: 30,
  },
  legendContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default MapLegendView;