import { Text, Image, View, Button, StyleSheet, FlatList } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';

export default function Carousel() {
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (  
    <View style={styles.container}>
      <Animated.FlatList 
        data={data} 
        renderItem={({item, index}) => <CarouselItem item={item} index={index} scrollX={scrollX}/>} 
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
      />

      <CarouselPagination /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: '100%',
    height: 200,
  },
});

const data = [
  {
    id: 1,
    content: 'aaaa',
    link: 'aaa link',
  },
  {
    id: 2,
    content: 'bbb',
    link: 'bbb link',
  },
  {
    id: 3,
    content: 'aaaa',
    link: 'ccc link',
  },
];