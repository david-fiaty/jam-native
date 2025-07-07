import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Slick from 'react-native-slick';

type Props = {
  data?: any;
};

const TextSlideshow = ({ data }: Props) => {
  return (
    <Slick 
      style={styles.wrapper} 
      showsButtons={false}
    >
      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Slick</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
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
  }
});

export default TextSlideshow;