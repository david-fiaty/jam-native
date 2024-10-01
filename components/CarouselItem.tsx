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
    title: 'Create better, together',
    content: 'Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.',
    link: 'aaa link',
  },
  {
    id: 2,
    title: 'Everything you need',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'bbb link',
  },
  {
    id: 3,
    title: 'The place to excel',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
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
        },
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
