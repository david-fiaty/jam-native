import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

type Props = {
  data: [],
  pagerIndex: number,
  scrollX: SharedValue<number>
}

export default function CarouselPager({ data, pagerIndex, scrollX }: Props) {

  return (  
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View style={[styles.dot, {backgroundColor: pagerIndex == index ? 'black' : 'gray'}]}></View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'gray',
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
