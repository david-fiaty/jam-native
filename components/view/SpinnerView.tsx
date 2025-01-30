import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';

type Props = {
  size?: string;
  color?: string;
  compact?: boolean;
  style?: any,
};

const SpinnerView = ({ size, color, compact, style}: Props) => {
  const spinnerSize: any = size || 'large';
  const spinnerColor: any = color ? Colors[color] : Colors['primary'];
  const containerStyle: any = compact ? styles.compact : {};

  return (
    <View style={[styles.container, style, containerStyle]}>
      <ActivityIndicator 
        size={spinnerSize} 
        color={spinnerColor} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Layout.space.base,
  },
  compact: {
    padding: 0,
  },
});

export default SpinnerView;