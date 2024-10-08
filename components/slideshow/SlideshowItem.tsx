import { StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
  scrollX: SharedValue<number>
};

const {width} = Dimensions.get('screen');

export default function SlideshowItem({item, index, scrollX}: Props) {
  const itemAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.1, 0, width * 0.1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (  
    <Animated.View style={[styles.itemContainer, itemAnimation]}>
      <Text style={[GlobalStyles.text, styles.itemTitle]}>{item.title}</Text>
      <Text style={[GlobalStyles.text, styles.itemContent]}>{item.content}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingLeft: 30,
    paddingRight: 30,
  },
  itemTitle: {
    textTransform: 'uppercase',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContent: {
    textAlign: 'center',
  },
});
