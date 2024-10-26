import { StyleSheet, Dimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import DeviceManager from '@/classes/DeviceManager';

type Props = {
  item: object,
  index: number,
  scrollX: SharedValue<number>
};

const width = DeviceManager.window.width - Layout.space.base*2;

export default function SlideshowItemText({item, index, scrollX}: Props) {
  const itemAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index-1)*width, index*width, (index+1)*width],
            [-width*0.25, 0, width*0.25],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (  
    <Animated.View style={[styles.container, itemAnimation]}>
      <TextView style={styles.title}>{item.title}</TextView>
      <TextView style={styles.content}>{item.content}</TextView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingHorizontal: Layout.space.base,
    gap: Layout.space.base,
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
});
