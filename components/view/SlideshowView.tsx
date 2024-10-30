import { StyleSheet, Text, View } from "react-native";
import Slick from "react-native-slick";

type Props = {
  data?: [];
  type?: string;
};

const SlideshowView = ({ data, type }: Props) => {
  const SlideshowItem = data?.map((item) => {
    if (type == "text") {
      return (
        <View style={styles.item}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      );
    } else if (type == "image") {
      return (
        <View style={styles.item}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      );
    }
  });

  return (
    <Slick style={styles.container} showsButtons={true}>
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

export default SlideshowView;
