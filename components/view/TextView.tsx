import { StyleSheet, Text } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  underline?: boolean;
  style?: any;
  children?: any;
};

const TextView = ({underline, style, children}: Props) => {
  const containerStyle: any = {
    ...(underline ? styles.underline : {}),
  };

  return (
    <Text style={[styles.container, style, containerStyle]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
    lineHeight: Layout.lineHeight,
  },
  underline: {
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Layout.colors.primary,
  },
});

export default TextView;
