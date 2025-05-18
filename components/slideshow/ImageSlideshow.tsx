import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import TextView from "../view/TextView";

type Props = {
  data?: any;
};

const width = ScreenManager.window.width - Layout.space.base * 2;
const height = 346;

const ImageSlideshow = ({ data }: Props) => {
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

  const renderDot = () => {
    return <View style={styles.dot}></View>;
  };

  const renderActiveDot = () => {
    return <View style={styles.activeDot}></View>;
  };

  if (data?.length > Config.maxSlieshowImages) {
    data = data.slice(Config.maxSlieshowImages - 1);
  } 

  if (data?.length > 0) {
    return (
      <View style={styles.container}>
        <Slick
          paginationStyle={styles.pagination}
          dot={renderDot()}
          activeDot={renderActiveDot()}
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
    backgroundColor: Layout.colors.secondary,
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
    gap: Layout.space.base/2,
  },
  dot: {
    backgroundColor: Layout.colors.secondary,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});

export default memo(ImageSlideshow);
