import { Layout } from '@/constants/Layout';
import { StyleSheet, View } from 'react-native';
import SpinnerView from './SpinnerView';
import BoxView from './BoxView';

const LoadingMoreView = () => {
  return (
    <BoxView style={styles.wrapper} direction="row" align="center" justify="center">
      <View style={styles.container}>
        <SpinnerView size="small" color="white" />
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: Layout.space.base,
    right: 0,
    left: 0,
  },
  container: {
    backgroundColor: Layout.colors.primary,
    opacity: 1,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
});

export default LoadingMoreView;
