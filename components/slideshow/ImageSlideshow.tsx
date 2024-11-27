import { StyleSheet, View } from "react-native";
import { Config } from '@/constants/Config';
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import DeviceManager from '@/manager/DeviceManager';

type Props = {
  data?: any;
};

const ImageSlideshow = ({data}: Props) => {
  const width = DeviceManager.window.width - Layout.space.base*2;

  const renderItem = (item: any, index: number) => (
    <View style={styles.item} key={`dot-${index}`}>
      <ImageView 
        uri={Config.imageUrl + item?.url} 
        resizeMode="cover" 
        width={width}
        height={346}
      />
    </View>
  );  

  const SlideshowItem = data?.map((item: any, index: number) => {
    return renderItem(item, index);
  });

  return (
    <View style={styles.container}>
      <Slick 
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {SlideshowItem}
      </Slick>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    height: 346,
    backgroundColor: Colors.secondary,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'uppercase',
  },
  content: {
    textAlign: 'center',
  },
  pagination: {
    bottom: -Layout.space.base, 
    left: 0,
    right: 0,
    height: Layout.space.base,
  },
  dot: {
    backgroundColor: Colors.secondary,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
});

export default ImageSlideshow;
