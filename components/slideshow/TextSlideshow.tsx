import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { useSharedValue, useDerivedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  data?: any;
};

const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;
const slideHeight: number = 100;
const wrapperHeight: number = 140;

const TextSlideshow = ({ data }: Props) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const currentProgress = useDerivedValue(() => {
    return progress.value;
  });

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - currentProgress.value,
      animated: true,
    });
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View
        key={`dot-${index}`}
        style={styles.slide}
      >
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.content}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Carousel
        ref={ref}
        width={slideWidth}
        height={slideHeight}
        data={data}
        windowSize={3}
        onProgressChange={progress}
        renderItem={({ index }) => renderItem(data[index], index)}
        onConfigurePanGesture={gestureChain => (
          gestureChain.activeOffsetX([-10, 10])
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.pager}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: wrapperHeight,
    marginTop: Layout.space.base,
    width: '100%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
  },
  title: {
    color: Layout.colors.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    marginBottom: Layout.space.base,
    paddingHorizontal: Layout.space.base * 3,
  },
  content: {
    color: Layout.colors.primary,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: Layout.space.base * 2.1,
  },
  pager: {
    gap: 5,
    marginTop: Layout.space.base,
  },
  dot: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: Layout.colors.primary,
    borderRadius: 50,
  },
});

export default TextSlideshow;