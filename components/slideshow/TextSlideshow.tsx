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
        style={styles.slide3}
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //gap: Layout.space.base,
    //padding: Layout.space.base * 2,
  },
  title: {
    textTransform: 'uppercase',
  },
  content: {
    textAlign: 'center',
  },
});

export default TextSlideshow;