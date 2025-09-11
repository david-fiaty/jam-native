import { StyleSheet, Text } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  underline?: boolean;
  color?: string;
  backgroundColor?: string;
  size?: any;
  bold?: boolean;
  style?: any;
  children?: any;
};

const TextView = ({underline, color, backgroundColor, size, bold, style, children}: Props) => {
  const containerStyle: any = {
    ...(underline ? styles.underline : {}),
    ...{
      color: color || Layout.colors.primary,
      fontSize: size || Layout.fontSize.base,
      fontWeight: bold ? 'bold' : 'normal',
      backgroundColor: backgroundColor || 'transparent',
    },
  };

  return (
    <Text style={[styles.container, containerStyle, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    lineHeight: Layout.lineHeight,
  },
  underline: {
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Layout.colors.primary,
  },
});

export default TextView;
