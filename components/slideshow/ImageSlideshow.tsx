import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Swiper from 'react-native-swiper';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  data?: any;
};

const dotSize: number = 8;
const slideHeight: number = Layout.imageSlideshow.height;
const wrapperHeight: number = 346;
const pagerHeight: number = 20;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;

const ImageSlideshow = ({ data }: Props) => {
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
      <Swiper
        showsButtons={false}
        paginationStyle={styles.pager}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {data?.map((item: any, index: number) => renderItem(item, index))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: wrapperHeight,
    marginTop: Layout.space.base,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
    width: slideWidth,
  },
  title: {
    color: Layout.colors.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    marginBottom: Layout.space.base,
    paddingHorizontal: Layout.space.base * 3,
  },
  content: {
    color: Layout.colors.primary,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: Layout.space.base * 2.1,
  },
  pager: {
    top: slideHeight + Layout.space.base,
    height: pagerHeight,
  },
  dot: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
    marginHorizontal: 3,
  },
});

export default ImageSlideshow;