import { useState, } from 'react';
import { View, StyleSheet, ViewToken } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import SlideshowPager from './SlideshowPager';
import SlideshowItemText from './SlideshowItemText';
import SlideshowItemImage from './SlideshowItemImage';

type Props = {
  data?: [],
  dataType: string,
};

const Slideshow = ({data, dataType}: Props) => {
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

  console.log(data);
  
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
    width: 'auto',
  },
});

export default Slideshow;