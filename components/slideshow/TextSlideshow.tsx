import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import Slick from "react-native-slick";
import TextView from "../view/TextView";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  data?: [] | object;
};

const width = ScreenManager.window.width - Layout.space.base * 2;
const height = 122;

const TextSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item: any, index: number) => {
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
    height: height,
    width: width,
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

export default TextSlideshow;
