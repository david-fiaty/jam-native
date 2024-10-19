import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  style?: object,
  children?: ReactNode,
};

export default ({style, children}: Props) => {
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
    backgroundColor: 'red',
    //paddingTop: Layout.space.container,
  },
});
