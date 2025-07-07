import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import React from 'react';
import Slick from 'react-native-slick';
import TextView from '../view/TextView';

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

    return (
      <View style={styles.item} key={`dot-${index}`}>
        <TextView style={styles.title}>{item.title}</TextView>
        <TextView style={styles.content}>{item.content}</TextView>
      </View>
    );
  };

  return (
    <Slick
      style={styles.wrapper}
      showsButtons={false}
    >
      {data?.map((item: any, index: number) => renderItem(item, index))}
    </Slick>
  );
};

var styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {

  },
});

export default TextSlideshow;