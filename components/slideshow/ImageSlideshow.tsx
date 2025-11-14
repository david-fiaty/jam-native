import React from 'react';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { useSharedValue, useDerivedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

type Props = {
  data?: any;
};

const slideHeight: number = Layout.imageSlideshow.height;
const wrapperHeight: number = 346;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;

const ImageSlideshow = ({ data }: Props) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const currentProgress = useDerivedValue(() => {
    return progress.value;
  });

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - currentProgress.value,
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
        windowSize={3}
        onProgressChange={progress}
        renderItem={({ index }) => renderItem(data[index], index)}
        onConfigurePanGesture={gestureChain => (
          gestureChain.activeOffsetX([-10, 10])
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.pager}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
    width: slideWidth,
  },
  pager: {
    gap: 5,
    marginTop: Layout.space.base,
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