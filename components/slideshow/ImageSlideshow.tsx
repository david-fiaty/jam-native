import React from 'react';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { useSharedValue, configureReanimatedLogger } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

type Props = {
  data?: any;
};

const slideHeight: number = Layout.imageSlideshow.height;
const wrapperHeight: number = 346;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;

const ImageSlideshow = ({ data }: Props) => {
  const ref: any = React.useRef<ICarouselInstance>(null);
  const progress: any = useSharedValue<number>(0);

  configureReanimatedLogger({
    strict: false,
  });

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
    <>
      <View style={styles.wrapper}>
        <Carousel
          ref={ref}
          width={slideWidth}
          height={slideHeight}
          data={data}
          enabled={data?.length > 1}
          loop={data?.length > 1}
          windowSize={3}
          onProgressChange={progress}
          renderItem={({ index }) => renderItem(data[index], index)}
        />
      </View>

      {data?.length > 1 && (
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.pager}
          onPress={onPressPagination}
        />
      )}
    </>
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
    marginBottom: Layout.space.base / 2,
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