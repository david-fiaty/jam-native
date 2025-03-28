import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = {
  size?: string;
  color?: string;
  style?: any,
};

const SpinnerView = ({ size, color, style}: Props) => {
  const spinnerSize: any = size || 'large';
  const spinnerColor: any = color ? Colors[color] : Colors['primary'];

  return (
    <View style={[styles.container, style]}>
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
  },
});

export default SpinnerView;