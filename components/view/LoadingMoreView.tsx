import { Layout } from '@/constants/Layout';
import { StyleSheet, View } from 'react-native';
import SpinnerView from './SpinnerView';
import BoxView from './BoxView';

type Props = {
  bottomSpace?: any;
};

const LoadingMoreView = ({ bottomSpace }: Props) => {
  const wrapperStyle: any = {
    bottom: bottomSpace || Layout.space.base,
  };

  return (
    <BoxView 
      style={[styles.wrapper, wrapperStyle]} 
      direction="row" 
      align="center" 
      justify="center"
    >
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
    right: 0,
    left: 0,
  },
  container: {
    backgroundColor: Layout.colors.primary,
    opacity: 0.75,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
});

export default LoadingMoreView;
