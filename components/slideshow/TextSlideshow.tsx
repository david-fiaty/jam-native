import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Slick from 'react-native-slick';

type Props = {
  data?: any;
};

const dotSize: number = 8;
const slideHeight: number = 100;
const wrapperHeight: number = 140;
const pagerHeight: number = 20;

const TextSlideshow = ({ data }: Props) => {
  const renderItem = (item: any, index: number) => {
    return (
      <View 
        key={`dot-${index}`}
        style={styles.slide}
      >
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.content}>
          {item.content}
        </Text>
      </View>      
    );
  };

  return (
    <View style={styles.wrapper}>
      <Slick
        showsButtons={false}
        paginationStyle={styles.pager}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {data?.map((item: any, index: number) => renderItem(item, index))}
      </Slick>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: wrapperHeight,
    marginTop: Layout.space.base,
    width: '100%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
  },
  title: {
    color: Layout.colors.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    marginBottom: Layout.space.base,
    paddingHorizontal: Layout.space.base*3,
  },
  content: {
    color: Layout.colors.primary,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: Layout.space.base*2.1,
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

export default TextSlideshow;