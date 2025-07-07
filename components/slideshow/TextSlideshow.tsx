import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Slick from 'react-native-slick';

type Props = {
  data?: any;
};

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
        paginationStyle={styles.pagination}
      >
        {data?.map((item: any, index: number) => renderItem(item, index))}
      </Slick>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 130,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  text: {
    color: Layout.colors.primary,
    padding: Layout.space.base * 2,
  },
  pagination: {
    top: 90,
    height: 20,
  },
});

export default TextSlideshow;