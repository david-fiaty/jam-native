
import React, { useRef, useState } from "react";
import { View, Text, Button, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from '@/constants/Layout';
import IconView from './IconView';

type Props = {

};

const MapLegendView = ({ }: Props) => {
  const [open, setOpen] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current; // initial width

  const toggle = () => {
    Animated.timing(widthAnim, {
      toValue: open ? 0 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  };

  return (
    <TouchableOpacity
      style={styles.legend}
      onPress={toggle}
    >
      <IconView
        name="right"
        theme="transparent"
      />

      <Animated.View style={[styles.box, { width: widthAnim }]}>
        <Text>Expanding Box</Text>
      </Animated.View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
  legend: {
    position: 'absolute',
    bottom: Layout.space.base * 5,
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base / 2,
  },
  box: {
    height: 100,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default MapLegendView;