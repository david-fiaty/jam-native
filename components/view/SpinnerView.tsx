import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';

type Props = {
  size?: string,
};

export default ({size}: Props) => {
  const spinnerSize = size || 'large';

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={spinnerSize} color={Colors.primary} />
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