import { StyleSheet, Text } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
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
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
    lineHeight: Layout.lineHeight,
  },
  underline: {
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Colors.primary,
  },
});

export default TextView;
