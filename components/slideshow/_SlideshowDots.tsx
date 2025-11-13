import { StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";

type Props = {
  activeIndex: number;
  itemsCount: number;
  onDotPress: (index: number) => void;
};

const dotSize: number = 8;

const SlideshowDots = ({ activeIndex, itemsCount, onDotPress }: Props) => {
  const renderDots = () => {
    if (itemsCount > 1) {
      return [...Array(itemsCount)].map((_, index) => {
        let dotStyle: any = activeIndex === index ? styles.activeDot : styles.dot;

        if (itemsCount > 3 && (index < (activeIndex - 1) || index > (activeIndex + 2))) {
          dotStyle = { ...dotStyle, ...styles.hiddenDot };
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onDotPress(index)}
            style={dotStyle}
          />
        )
      });
    }

    return <></>;
  };
  
  return (
    <BoxView
      direction="row"
      justify="center"
      align="center"
      style={styles.dotsContaier}
    >
      {renderDots()}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  dotsContaier: {
    //zIndex: 100,
    width: '100%',
    paddingTop: Layout.space.base*1.3,
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
  hiddenDot: {
    display: 'none',
    //backgroundColor: 'red',
  }

});

export default SlideshowDots;
