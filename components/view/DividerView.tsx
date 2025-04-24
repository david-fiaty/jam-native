import { StyleSheet, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
  theme?: string, 
  style?: object,
};

const DividerView = ({theme, style}: Props) => {
  const dividerStyle = theme ? theme : Colors.white;

  return (
    <Divider style={[styles.container, styles[dividerStyle], style]} />
  );
};

const styles: any = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: Layout.space.base/4,
  },
  primary: {
    borderWidth: Layout.borderWidth.base,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  secondary: {
    borderWidth: Layout.borderWidth.base,
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  tertiary: {
    borderWidth: Layout.borderWidth.base,
    borderColor: Colors.tertiary,
    backgroundColor: Colors.tertiary,
  },
  white: {
    borderWidth: Layout.borderWidth.base,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  }
});

export default DividerView;
