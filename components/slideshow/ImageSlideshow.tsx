import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Swiper from 'react-native-swiper';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';
import BoxView from '../view/BoxView';

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

  const renderDot = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={`dot-${index}`}
        style={styles.dot}
      //onPress={() => onDotPress(index)}
      />
    );
  };

  return (
    <>
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.wrapper}
      >
        <ScrollView
          horizontal={true}
        >
          {data?.map((item: any, index: number) => renderItem(item, index))}
        </ScrollView>
      </BoxView>

      <BoxView
        direction="row"
        align="center"
        justify="center"
        style={styles.pager}
      >
        {data?.map((item: any, index: number) => renderDot(item, index))}
      </BoxView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: wrapperHeight,
    marginTop: Layout.space.base / 2,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
    width: slideWidth,
  },
  pager: {
    backgroundColor: 'red',
    height: pagerHeight,
  },
  dot: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
  },
});

export default ImageSlideshow;