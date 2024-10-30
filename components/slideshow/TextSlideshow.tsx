import { StyleSheet, View } from "react-native";
import Slick from "react-native-slick";
import TextView from "../view/TextView";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { GlobalStyles } from "@/constants/GlobalStyles";

type Props = {
  data?: object;
};

const TextSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item, index) => {
    return (
      <View style={styles.item} key={`dot-${index}`}>
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
    //height: 122,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
    gap: Layout.space.base,
    padding: Layout.space.base*2,
  },
  title: {
    textTransform: 'uppercase',
  },
  content: {
    textAlign: 'center',
    backgroundColor: 'yellow',
  },
  pagination: {
    //top: 122, 
    left: 0,
    right: 0,
    height: GlobalStyles.space.base,
  },
  dot: {
    backgroundColor: Colors.secondary,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
});

export default TextSlideshow;
