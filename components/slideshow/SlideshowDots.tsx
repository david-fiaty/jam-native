import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";

import React from 'react';
import Svg, { Rect, Mask, Circle } from 'react-native-svg';


type Props = {
  activeIndex: number;
  itemsCount: number;
  onDotPress: (index: number) => void;
};

const dotSize: number = 9;

const SlideshowDots = ({ activeIndex, itemsCount, onDotPress }: Props) => {

  const renderDots = () => {
    if (itemsCount > 1) {
      return [...Array(itemsCount)].map((_, index) => {
        let dotStyle: any = activeIndex === index ? styles.activeDot : styles.dot;

        if (index < (activeIndex - 1) || index > (activeIndex + 2)) {
          dotStyle = { ...dotStyle, ...styles.hiddenDot };
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onDotPress(index)}
            style={dotStyle}
          />
        )
      });
    }

    return <></>;
  };

  const test = () => {
    return (
      <View style={styles.test}>
        <Svg height="100%" width="100%">
          <Mask id="mask">
            <Rect x="0" y="0" width="100%" height="100%" fill="white" />
            <Circle
              cx="50%"
              cy="50%"
              r="20"
              fill="black"
            />
          </Mask>

          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.8)"
            mask="url(#mask)"
          />
        </Svg>
      </View>
    );
  };

  return test();
  
  return (
    <BoxView
      direction="row"
      justify="center"
      align="center"
      style={styles.dotsContaier}
    >
      {renderDots()}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  test: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 50,
    height: 50,
  },
  dotsContaier: {
    zIndex: 100,
    width: '100%',
    position: 'absolute',
    bottom: -Layout.space.base * 2.9,
    gap: dotSize,
  },
  dot: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
  hiddenDot: {
    display: 'none',
    //backgroundColor: 'red',
  }

});

export default SlideshowDots;
