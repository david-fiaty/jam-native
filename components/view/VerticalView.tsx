import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  style?: object,
  children?: ReactNode,
};

export default ({style, children}: Props) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Layout.space.base,
  },
});