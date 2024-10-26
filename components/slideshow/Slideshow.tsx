import { useState, } from 'react';
import { View, StyleSheet, ViewToken } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Layout } from '@/constants/Layout';
import SlideshowPager from './SlideshowPager';
import SlideshowItemText from './SlideshowItemText';
import SlideshowItemImage from './SlideshowItemImage';

const test = [
  {
    id: 1,
    title: 'Create better, together',
    content: 'Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.',
    link: 'aaa link',
  },
  {
    id: 2,
    title: 'Everything you need',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'bbb link',
  },
  {
    id: 3,
    title: 'The place to excel',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    link: 'ccc link',
  },
];

type Props = {
  data?: [],
  dataType: string,
};

const Slideshow = ({data, dataType}: Props) => {
  data = dataType == 'image' ? test : data; // Todo - Remove test

  const scrollX = useSharedValue(0);
  const [pagerIndex, setPagerIndex] = useState(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({viewableItems} : {viewableItems: ViewToken[]}) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPagerIndex(viewableItems[0].index);
    }
  };

  return (  
    <View style={styles.container}>

      <Animated.FlatList 
        data={data} 
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item, index}) => {
          return (
            dataType == 'image' 
            ? <SlideshowItemImage item={item} index={index} scrollX={scrollX} />
            : <SlideshowItemText item={item} index={index} scrollX={scrollX} />
          );
        }} 
      />

      <SlideshowPager data={data} pagerIndex={pagerIndex}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default Slideshow;