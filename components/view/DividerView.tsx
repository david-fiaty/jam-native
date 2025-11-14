import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  theme?: string, 
  style?: object,
};

const DividerView = ({theme, style}: Props) => {
  const dividerStyle = theme ? Layout.theme[theme] : Layout.theme.white;

  return (
    <View style={[styles.container, dividerStyle, style]} />
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
