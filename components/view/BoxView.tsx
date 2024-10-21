import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  direction?: string,
  align?: string,
  x?: string,
  justify?: string,
  style?: object,
  children?: ReactNode,
};

export default ({direction, x, align, justify, style, children}: Props) => {
  const containerStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
});