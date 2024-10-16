import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/GlobalStyles';

type Props = {
  style?: object,
  children?: ReactNode,
};

const ViewportContainer = ({style, children}: Props) => {
  return (
    <SafeAreaView 
      edges={['left', 'right', 'bottom']} 
      style={[styles.container, style]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    
    /*
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    */
    //backgroundColor: Colors.background,
    
  },
});

export default ViewportContainer;