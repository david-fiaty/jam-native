import { StyleSheet, Text, View } from "react-native";
import Slick from "react-native-slick";
import TextView from "../view/TextView";

type Props = {
  data?: [];
};

const ImageSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item, index) => {
    return (
      <View style={styles.item} key={`dot-${index}`}>
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
  container: {},
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ImageSlideshow;
