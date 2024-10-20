import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  direction?: string,
  align?: string,
  justify?: string,
  style?: object,
  children?: ReactNode,
};

export default ({direction, align, justify, style, children}: Props) => {
  const containerStyle = {
    flexDirection: direction,
    alignItems: align || 'center',
    justifyContent: justify,
  };

  return (
    <View style={[styles.container, style, containerStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});