import React, { memo, useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import SpinnerView from "../view/SpinnerView";
import SlideshowDots from "./SlideshowDots";

type Props = {
  data?: any;
};

const width: number = ScreenManager.window.width - Layout.space.base * 2;
const height: number = 346;

const ImageSlideshow = ({ data }: Props) => {
  const slideshowRef = useRef<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Todo - Enable and fix or remove
  /*
  if (data?.length > Config.maxSlieshowImages) {
    data = data.slice(Config.maxSlieshowImages - 1);
  }
  */

  const onDotPress = (index: number) => {
    slideshowRef.current?.scrollBy(index - activeIndex);
  };

  const renderItem = (item: any, index: number) => (
    <View style={styles.slideshowItem} key={`dot-${index}`}>
      <ImageView
        uri={MediaManager.getImageUrl(item?.url)}
        resizeMode="cover"
        width={width}
        height={height}
      />
    </View>
  );

  const onMomentumScrollEnd = (e: any, state: any) => {
    setActiveIndex(state.index);
  };

  useEffect(() => {
    if (!isLoaded) {
      setItemsCount(data?.length || 0);
      setIsLoaded(true);
    }
  }, [isLoaded, data]);

  return (
    <View style={styles.container}>
      <View style={styles.slideshowContainer}>
        {!isLoaded && <SpinnerView />}

        {isLoaded && data?.length > 0 && (
          <Slick
            ref={slideshowRef}
            showsPagination={false}
            loop={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
          >
            {data?.map((item: any, index: number) => renderItem(item, index))}
          </Slick>
        )}

        {!data?.length && (
          <NoImageView
            width={width}
            height={height}
            containerStyle={{
              height: height,
              borderRadius: 0,
            }}
          />
        )}
      </View>

      <SlideshowDots
        activeIndex={activeIndex}
        itemsCount={itemsCount}
        onDotPress={(index) => onDotPress(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideshowContainer: {
    height: height,
    backgroundColor: Layout.colors.secondary,
  },
  slideshowItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(ImageSlideshow);
