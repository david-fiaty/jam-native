import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PanResponder } from 'react-native';
import { Layout } from '@/constants/Layout';
import Swiper from 'react-native-swiper';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import ScreenManager from '@/manager/ScreenManager';

import PagerView from 'react-native-pager-view';


type Props = {
  data?: any;
};

const dotSize: number = 40;
const slideHeight: number = Layout.imageSlideshow.height;
const wrapperHeight: number = 346;
const pagerHeight: number = 20;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;

const ImageSlideshow = ({ data }: Props) => {
  const [page, setPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const goToPage = (index: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(index);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 10, // activate on horizontal move
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -20 && page < data.length - 1) {
          goToPage(page + 1); // swipe left → next page
        } else if (gesture.dx > 20 && page > 0) {
          goToPage(page - 1); // swipe right → previous page
        }
      },
    })
  ).current;


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
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {data?.map((item: any, index: number) => renderItem(item, index))}
      </PagerView>

      <View style={styles.swipeArea} {...panResponder.panHandlers}>
        <View style={styles.dotsContainer}>
          {data.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToPage(i)}
            >
              <View

                style={[
                  styles.dot,
                  { opacity: page === i ? 1 : 0.3, transform: [{ scale: page === i ? 1.1 : 1 }] },
                ]}
              />

            </TouchableOpacity>
          ))}

        </View>
      </View>
    </>
  );

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

  swipeArea: {
    paddingVertical: 12, // larger touch/swipe zone
  },
  pagerView: {
    flex: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

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