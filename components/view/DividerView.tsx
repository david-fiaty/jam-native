import { StyleSheet, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
  theme?: string, 
  style?: object,
};

const DividerView = ({theme, style}: Props) => {
  const dividerStyle = theme ? Layout.theme[theme] : Layout.theme.white;

  return (
    <Divider style={[styles.container, dividerStyle, style]} />
  );
};

const styles: any = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: Layout.space.base/4,
  },
  white: Layout.theme.white,
});

export default DividerView;
