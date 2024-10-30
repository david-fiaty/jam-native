import { StyleSheet, Text, View } from "react-native";
import Slick from "react-native-slick";

type Props = {
  data?: [];
};

const ImageSlideshow = ({data}: Props) => {
  const SlideshowItem = data?.map((item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.title}</Text>
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
