import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import Swiper from 'react-native-swiper';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';
import BoxView from '../view/BoxView';

type Props = {
  data?: any;
};

const dotSize: number = 20;
const slideHeight: number = Layout.imageSlideshow.height;
const wrapperHeight: number = 346;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;

const ImageSlideshow = ({ data }: Props) => {
  const scrollView1Ref: any = useRef<ScrollView>(null);
  const scrollView2Ref: any = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const isSyncing: any = useRef(false);
  const lastOffset: any = useRef(0);
  
  const onScrollView1Scroll = (e: any, targetRef: any) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    let x: number = e.nativeEvent.contentOffset.x;
    let w: number = slideWidth;

    targetRef.current?.scrollTo({ x, animated: false });
    setCurrentIndex(Math.abs(Math.round(x / w)));

    setTimeout(() => (isSyncing.current = false), 0);
  };

  const onScrollView2Scroll = (targetRef: any) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    
    //let x: number = slideWidth * currentIndex;
    //targetRef.current?.scrollTo({ x: x, animated: false });
    //setCurrentIndex(index);

    setTimeout(() => (isSyncing.current = false), 0);
  };

  const onDotPress = (index: number, targetRef: any) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    let x: number = slideWidth * index;

    targetRef.current?.scrollTo({ x: x, animated: false });
    setCurrentIndex(index);

    setTimeout(() => (isSyncing.current = false), 0);
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

  const renderDot = (item: any, index: number) => {
    let dotStyle: any = {
      ...styles.dot,
      ...(index === currentIndex ? styles.activeDot : {}),
    };

    return (
      <TouchableOpacity
        key={`dot-${index}`}
        style={dotStyle}
        onPress={() => onDotPress(index, scrollView1Ref)}
      />
    );
  };

  return (
    <>
      <ScrollView
        ref={scrollView1Ref}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => onScrollView1Scroll(e, scrollView2Ref)}
        contentContainerStyle={styles.sliderScrollView}
      >
        {data?.map((item: any, index: number) => renderItem(item, index))}
      </ScrollView>

      <ScrollView
        ref={scrollView2Ref}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => onScrollView2Scroll(scrollView1Ref)}
        contentContainerStyle={styles.pagerScrollView}
      >
        {data?.map((item: any, index: number) => renderDot(item, index))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  sliderScrollView: {
    height: wrapperHeight,
    marginTop: Layout.space.base / 2,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
    width: slideWidth,
  },
  pagerScrollView: {
    flex: 1,
    gap: Layout.space.base / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: Layout.space.base,
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