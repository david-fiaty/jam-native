import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Slick from 'react-native-slick';
import { Layout } from '@/constants/Layout';

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
    <Slick
      style={styles.wrapper}
      showsButtons={false}
      paginationStyle={styles.pagination}
    >
      {data?.map((item: any, index: number) => renderItem(item, index))}
    </Slick>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: Layout.colors.primary,
    padding: Layout.space.base * 2,
  },
  pagination: {
    top: 0,
  },
});

export default TextSlideshow;