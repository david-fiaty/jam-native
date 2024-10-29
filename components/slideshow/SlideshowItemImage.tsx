import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';
import ImageView from '../view/ImageView';
import DeviceManager from '@/classes/DeviceManager';

type Props = {
  item: object,
  index: number,
  scrollX: SharedValue<number>
};

const width = DeviceManager.window.width - Layout.space.base*2;

export default function SlideshowItemImage({item, index, scrollX}: Props) {
  const itemAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index-1)*width, index*width, (index+1)*width],
            [-width, 0, width],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (  
    <Animated.View style={[styles.container, itemAnimation]}>
      <ImageView 
        url={Config.imageUrl + item?.url} 
        resizeMode="cover" 
        style={styles.listItemImage}
        width={width}
        height={346}
       />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    height: 346,
    width: 'auto',
  },
  listItemImage: {
    backgroundColor: Colors.secondary,
  },
});
