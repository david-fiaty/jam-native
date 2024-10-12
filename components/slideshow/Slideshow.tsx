import { useState, } from 'react';
import { View, StyleSheet, ViewToken } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import SlideshowItem from '@/components/slideshow/SlideshowItem';
import SlideshowPager from '@/components/slideshow/SlideshowPager';
import WelcomeSlidehowContent from '@/constants/WelcomeSlideshowContent';

const Slideshow = () => {
  const data = WelcomeSlidehowContent;
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
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPagerIndex(viewableItems[0].index);
    }
  };

  return (  
    <View style={styles.container}>
      <Animated.FlatList 
        data={data} 
        renderItem={({item, index}) => <SlideshowItem item={item} index={index} scrollX={scrollX} />} 
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
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
    height: 200,
  },
});

export default Slideshow;