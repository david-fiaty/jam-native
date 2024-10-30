import { StyleSheet, View } from "react-native";
import Slick from "react-native-slick";
import TextView from "../view/TextView";
import { Layout } from "@/constants/Layout";

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
    <Slick style={styles.container} >
      {SlideshowItem}
    </Slick>
  );
};

const styles = StyleSheet.create({
  container: { 
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default TextSlideshow;
