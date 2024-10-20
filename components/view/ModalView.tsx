import { StyleSheet } from 'react-native';
import BoxView from './BoxView';
import { BaseProps } from '@/constants/Types';

export default ({style, children}: Props) => {
  return (
    <BoxView style={[styles.container, style]}>
      {children}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});
