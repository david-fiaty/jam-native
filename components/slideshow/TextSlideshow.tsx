// App.tsx or SwiperExample.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const slides = [
  { id: 1, title: 'Welcome', color: '#FF6B6B', image: 'https://picsum.photos/id/1018/600/400' },
  { id: 2, title: 'Discover', color: '#4ECDC4', image: 'https://picsum.photos/id/1025/600/400' },
  { id: 3, title: 'Enjoy', color: '#1A535C', image: 'https://picsum.photos/id/1035/600/400' },
];

const SwiperExample = () => {
  return (
    <View style={styles.container}>
      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={true}
        activeDotColor="#fff"
        dotColor="rgba(255,255,255,0.4)"
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { backgroundColor: slide.color }]}>
            <Image source={{ uri: slide.image }} style={styles.image} />
            <Text style={styles.text}>{slide.title}</Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    bottom: 60,
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default SwiperExample;
