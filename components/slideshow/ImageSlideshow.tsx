import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";

type Props = {
  data?: any;
};

const width = ScreenManager.window.width - Layout.space.base * 2;
const height = 346;

const ImageSlideshow = ({ data }: Props) => {
  if (data?.length > Config.maxSlieshowImages) {
    data = data.slice(Config.maxSlieshowImages - 1);
  } 
  
  const renderItem = (item: any, index: number) => (
    <View style={styles.item} key={`dot-${index}`}>
      <ImageView
        uri={MediaManager.getImageUrl(item?.url)}
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
      width={width}
      height={height}
      containerStyle={{
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
    bottom: -Layout.space.base*2.85,
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

export default memo(ImageSlideshow);
