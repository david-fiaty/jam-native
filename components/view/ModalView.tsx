import { StyleSheet } from 'react-native';
import BoxView from './BoxView';
import Props from '@/constants/Interfaces';

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
