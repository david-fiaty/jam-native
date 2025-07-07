import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Slick from 'react-native-slick';

type Props = {
  data?: any;
};

const dotSize: number = 8;
const slideHeight: number = 90;
const wrapperHeight: number = 130;
const pagerHeight: number = 20;

const TextSlideshow = ({ data }: Props) => {
  const renderItem = (item: any, index: number) => {
    return (
      <View 
        key={`dot-${index}`}
        style={styles.slide}
      >
        <Text style={styles.text}>
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
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
  },
  text: {
    color: Layout.colors.primary,
    padding: Layout.space.base * 2,
    textAlign: 'center',
  },
  pager: {
    top: slideHeight,
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