import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';

type Props = {
  style?: {},
  children?: ReactNode,
};

const ScreenView = ({style, children}: Props) => {
  return (
    <View style={styles.container}>{children}</View>   
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
  },
});

export default ScreenView;