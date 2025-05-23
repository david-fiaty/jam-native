import React, { memo, useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import Slick from "react-native-slick";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";

type Props = {
  data?: any;
};

const width: number = ScreenManager.window.width - Layout.space.base * 2;
const height: number = 346;
const dotSize: number = 9;

const ImageSlideshow = ({ data }: Props) => {
  const slideshowRef = useRef<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (data?.length > Config.maxSlieshowImages) {
    data = data.slice(Config.maxSlieshowImages - 1);
  }

  const onDotPress = (nextIndex: number) => {
    let newIndex: number = 0;

    if (nextIndex > activeIndex) {
      newIndex = nextIndex + activeIndex;
    }
    else {
      newIndex = nextIndex - activeIndex;
    }

    slideshowRef.current?.scrollBy(newIndex);
    setActiveIndex(newIndex);
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

  const renderDots = () => {
    if (itemsCount > 1) {
      return [...Array(itemsCount)].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onDotPress(index)}
          style={activeIndex === index ? styles.activeDot : styles.dot}
        />
      ));
    }

    return <></>;
  };

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

      <BoxView
        direction="row"
        justify="center"
        align="center"
        style={styles.dotsContaier}
      >
        {renderDots()}
      </BoxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
  dotsContaier: {
    zIndex: 100,
    width: '100%',
    position: 'absolute',
    bottom: -Layout.space.base * 2.9,
    gap: dotSize,
  },
  dot: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
  },
});

export default memo(ImageSlideshow);
