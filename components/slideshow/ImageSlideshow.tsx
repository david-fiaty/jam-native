import { StyleSheet, View } from "react-native";
import Slick from "react-native-slick";
import TextView from "../view/TextView";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";

type Props = {
  data?: [] | object;
};

const ImageSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item: object, index: number) => {
    return (
      <View style={styles.item} key={`dot-${index}`}>
        <TextView style={styles.title}>{item.title}</TextView>
        <TextView style={styles.content}>{item.content}</TextView>
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
    height: 122,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base*2,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.space.base,
    padding: Layout.space.base*2,
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
