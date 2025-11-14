import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Swiper from 'react-native-swiper';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';

import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

type Props = {
  data?: any;
};

const slideHeight: number = Layout.imageSlideshow.height;
const wrapperHeight: number = 346;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;

const ImageSlideshow = ({ data }: Props) => {

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View
        key={`dot-${index}`}
        style={styles.slide}
      >
        <ImageView
          uri={MediaManager.getImageUrl(item?.url)}
          resizeMode="cover"
          width={slideWidth}
          height={slideHeight}
        />
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Carousel
        ref={ref}
        width={slideWidth}
        height={slideHeight}
        data={data}
        onProgressChange={progress}
        renderItem={({ index }) => renderItem(data[index], index) }
      />
 
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: wrapperHeight,
    marginTop: Layout.space.base,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
    width: slideWidth,
  },
  dot: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    borderRadius: 50,
  },
});

export default ImageSlideshow;