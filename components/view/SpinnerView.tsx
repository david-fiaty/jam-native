import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  size?: string;
  color?: string;
  style?: any,
};

const SpinnerView = ({ size, color, style}: Props) => {
  const spinnerSize: any = size || 'large';
  const spinnerColor: any = color ? Layout.colors[color] : Layout.colors['primary'];

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
    alignSelf: 'center',
  },
});

export default SpinnerView;