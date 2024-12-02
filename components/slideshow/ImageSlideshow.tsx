import { StyleSheet, View } from "react-native";
import { Config } from "@/constants/Config";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import DeviceManager from "@/manager/DeviceManager";
import NoImageView from "../view/NoImageView";

type Props = {
  data?: any;
};

const width = DeviceManager.window.width - Layout.space.base * 2;
const height = 346;

const ImageSlideshow = ({ data }: Props) => {
  const renderItem = (item: any, index: number) => (
    <View style={styles.item} key={`dot-${index}`}>
      <ImageView
        uri={Config.imageUrl + item?.url}
        resizeMode="cover"
        width={width}
        height={height}
      />
    </View>
  );

  if (data?.length > 0) {
    return (
      <View style={styles.container}>
        <Slick
          paginationStyle={styles.pagination}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {data?.map((item: any, index: number) => {
            return renderItem(item, index);
          })}
        </Slick>
      </View>
    );
  }

  return (
    <NoImageView
      imageSize={120}
      containerStyle={{
        width: '100%',
        height: height,
        borderRadius: 0,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: Colors.secondary,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textTransform: "uppercase",
  },
  content: {
    textAlign: "center",
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
