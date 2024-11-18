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
  const dividerStyle = theme ? theme : 'white';

  return (
    <Divider style={[styles.container, styles[dividerStyle], style]} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: Layout.space.base/4,
  },
  primary: {
    borderWidth: 0.1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  secondary: {
    borderWidth: 0.1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  tertiary: {
    borderWidth: 0.1,
    borderColor: Colors.tertiary,
    backgroundColor: Colors.tertiary,
  },
  white: {
    borderWidth: 0.1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  }
});

export default DividerView;
