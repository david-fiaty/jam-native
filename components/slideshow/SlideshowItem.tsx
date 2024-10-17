import { StyleSheet, Dimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';

type Props = {
  item: object,
  index: number,
  scrollX: SharedValue<number>
};

const {width} = Dimensions.get('window');

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
    <Animated.View style={[styles.container, itemAnimation]}>
      <TextBlock style={styles.title}>{item.title}</TextBlock>
      <TextBlock style={styles.content}>{item.content}</TextBlock>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingHorizontal: GlobalStyles.space.base,
    gap: GlobalStyles.space.base,
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
});
