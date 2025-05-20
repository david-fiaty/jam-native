import React, { memo, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";

type Props = {
  data?: any;
};

const width: number = ScreenManager.window.width - Layout.space.base * 2;
const height: number = 346;
const dotSize: number = 8;

const ImageSlideshow = ({ data }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imagesCount, setImagesCount] = useState<number>(0);

  if (data?.length > Config.maxSlieshowImages) {
    data = data.slice(Config.maxSlieshowImages - 1);
  }

  const onDotPress = () => {
    // Todo - Implement dot press event
    console.log('on dot press event')
  };

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
    return (
      <TouchableOpacity
        onPress={onDotPress}
        style={styles.dot}
      />
    );
  };

  const renderActiveDot = () => {
    return (
      <TouchableOpacity
        onPress={onDotPress}
        style={styles.activeDot}
      />
    );
  };

  const renderDots = () => {
    return (
      <View>
        {[...Array(slideCount)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => slickRef.current?.scrollBy(index - activeIndex)}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };

  useEffect(() => {
    if (!isLoaded) {
      setImagesCount(data?.length || 0);
      setIsLoaded(true);
    }

  }, [isLoaded, data]);

  return (
    <>
      {data?.length > 0 && (
        <View style={styles.container}>
          <Slick
            showsPagination={false}
          //paginationStyle={styles.pagination}
          //dot={renderDot()}
          //activeDot={renderActiveDot()}
          >
            {data?.map((item: any, index: number) => renderItem(item, index))}
          </Slick>
        </View>
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
    </>
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
    bottom: -Layout.space.base * 2.85,
    left: 0,
    right: 0,
    height: Layout.space.base,
    gap: Layout.space.base / 1.5,
    zIndex: 100,
  },
  dot: {
    backgroundColor: Layout.colors.secondary,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
});

export default memo(ImageSlideshow);
