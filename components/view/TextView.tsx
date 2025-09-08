import { StyleSheet, Text } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  underline?: boolean;
  color?: string;
  style?: any;
  children?: any;
};

const TextView = ({underline, color, style, children}: Props) => {
  const containerStyle: any = {
    ...(underline ? styles.underline : {}),
    ...{
      color: color || Layout.colors.primary,
    }
  };

  return (
    <Text style={[styles.container, containerStyle, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: Layout.fontSize.base,
    lineHeight: Layout.lineHeight,
  },
  underline: {
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Layout.colors.primary,
  },
});

export default TextView;
