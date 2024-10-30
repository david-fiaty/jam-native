import { StyleSheet, View } from "react-native";
import Slick from "react-native-slick";
import { Config } from '@/constants/Config';
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import ImageView from "../view/ImageView";
import DeviceManager from '@/classes/DeviceManager';

type Props = {
  data?: [] | object;
};

const width = DeviceManager.window.width - Layout.space.base*2;

const ImageSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item: object, index: number) => {
    return (
      <View style={styles.item} key={`dot-${index}`}>
        <ImageView 
          source={{uri: Config.imageUrl + item?.url}} 
          resizeMode="cover" 
          //style={styles.listItemImage}
          width={width}
          height={346}
        />
      </View>
    );
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
    backgroundColor: 'green',
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
    bottom: 0, 
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
