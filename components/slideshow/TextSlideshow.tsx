import { StyleSheet, View } from "react-native";
import Slick from "react-native-slick";
import TextView from "../view/TextView";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";

type Props = {
  data?: object;
};

const TextSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item) => {
    return (
      <View style={styles.item}>
        <TextView style={styles.title}>{item.title}</TextView>
        <TextView style={styles.content}>{item.content}</TextView>
      </View>
    );
  });

  return (
    <Slick 
      style={styles.container} 
      paginationStyle={styles.pagination}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      {SlideshowItem}
    </Slick>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'green',
    height: 200,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#9DD6EB",
    gap: Layout.space.base,
    paddingHorizontal: Layout.space.base*2,
  },
  title: {
    textTransform: 'uppercase',
  },
  content: {
    textAlign: 'center',
  },
  pagination: {
    top: 40, 
    left: 0,
    right: 0,
  },
  dot: {
    backgroundColor: Colors.secondary,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
});

export default TextSlideshow;
