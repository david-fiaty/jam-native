import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

type Props = {
  item: object,
  index: number,
  scrollX: SharedValue<number>
}

const {width} = Dimensions.get('screen');
const data = [
  {
    id: 1,
    content: 'aaaa',
    link: 'aaa link',
  },
  {
    id: 2,
    content: 'bbb',
    link: 'bbb link',
  },
  {
    id: 3,
    content: 'aaaa',
    link: 'ccc link',
  },
];

export default function CarouselItem({item, index, scrollX}: Props) {
  const itemAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0 , width * 0.25],
            Extrapolation.CLAMP,
          ),
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1 , 0.9],
            Extrapolation.CLAMP,
          ),
        }
      ],
    };
  });

  return (  
    <Animated.View style={[styles.itemContainer, itemAnimation]}>
      <Text>{index}</Text>
      <Text>{item.content}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: width,
    backgroundColor: 'orange',
  },
});
