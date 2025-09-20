import { Layout } from '@/constants/Layout';
import { StyleSheet, View } from 'react-native';
import SpinnerView from './SpinnerView';

const LoadingMoreView = () => {
  return (
    <View style={styles.container}>
      <SpinnerView size="small" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base,
    backgroundColor: Layout.colors.primary,
    opacity: 0.75,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default LoadingMoreView;
