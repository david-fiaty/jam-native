import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

type Props = {
  data: object,
  pagerIndex: number,
  scrollX: SharedValue<number>
}

export default function CarouselPager({ data, pagerIndex, scrollX }: Props) {

  return (  
    <View style={styles.container}>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
  },
});
