import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';

type Props = {
  size?: string,
  theme?: string,
};

const SpinnerView = ({size, theme}: Props) => {
  const spinnerSize: any = size || 'large';
  const spinnerColor: any = Colors[theme || 'primary'];

  return (
    <View style={styles.container}>
      <ActivityIndicator size={spinnerSize} color={spinnerColor} />
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
});

export default SpinnerView;