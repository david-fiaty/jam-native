import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';

type Props = {
  size?: string,
};

const SpinnerView = ({size}: Props) => {
  const spinnerSize: any = size || 'large';

  return (
    <View style={styles.container}>
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

export default SpinnerView;