import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from "@/constants/Layout";
import Slick from "react-native-slick";
import TextView from "../view/TextView";
import ScreenManager from "@/manager/ScreenManager";
import BoxView from "../view/BoxView";

type Props = {
  data?: any;
};

const width = ScreenManager.window.width - Layout.space.base * 2;
const height = 122;
const dotSize: number = 9;

const TextSlideshow = ({ data }: Props) => {
  const slideshowRef = useRef<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
    <View style={styles.item} key={`dot-${index}`}>
      <TextView style={styles.title}>{item.title}</TextView>
      <TextView style={styles.content}>{item.content}</TextView>
    </View>
  );

  const renderDots = () => {
    return [...Array(itemsCount)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onDotPress(index)}
        style={activeIndex === index ? styles.activeDot : styles.dot}
      />
    ));
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
    <View style={styles.slideshowContainer}>
      <Slick
        ref={slideshowRef}
        showsPagination={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {data?.map((item: any, index: number) => renderItem(item, index))}
      </Slick>

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
  slideshowContainer: {
    height: height,
    width: width,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base * 2,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.space.base,
    padding: Layout.space.base * 2,
  },
  title: {
    textTransform: 'uppercase',
  },
  content: {
    textAlign: 'center',
  },
  dotsContaier: {
    zIndex: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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

export default TextSlideshow;
