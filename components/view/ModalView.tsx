import { ReactNode } from 'react';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import BoxView from './BoxView';

type Props = {
  style?: object,
  children?: ReactNode,
};

export default ({style, children}: Props) => {
  return (
    <BoxView style={[styles.container, style]}>
      {children}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});
