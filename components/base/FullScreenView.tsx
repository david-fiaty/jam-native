import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  style?: object,
  children?: ReactNode,
};

const FullScreenView = ({style, children}: Props) => {
  return (
    <View style={styles.container}>{children}</View>   
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
    gap: GlobalStyles.space.base*2,
  },
});

export default FullScreenView;