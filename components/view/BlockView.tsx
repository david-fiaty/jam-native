import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  direction?: string,
  style?: object,
  children?: ReactNode,
};

export default ({direction, style, children}: Props) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Layout.space.base,
  },
});