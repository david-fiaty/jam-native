import { memo } from "react";
import { StyleSheet, Text, View } from 'react-native';
import ImageSlideshow from "@/components/slideshow/ImageSlideshow";
import NoImageView from "@/components/view/NoImageView";
import ScreenManager from "@/manager/ScreenManager";
import { Layout } from "@/constants/Layout";

type Props = {
  row?: any;
};

const slideHeight: number = 336;
const wrapperHeight: number = 346;
const pagerHeight: number = 20;
const slideWidth: number = ScreenManager.window.width - Layout.space.base * 3;


const ListItemImage = ({ row }: Props) => {
  if (!row?.item?.medias?.length) {
    return (
      <View

        style={styles.slide}
      >
        <NoImageView
          width={slideWidth}
          height={slideHeight}
          containerStyle={{
            height: slideHeight,
            borderRadius: 0,
          }}
        />

      </View>
    );
  }
  else {
    return <ImageSlideshow data={row?.item?.medias} />;
  }
};

const styles = StyleSheet.create({
  wrapper: {
    height: wrapperHeight,
    marginTop: Layout.space.base,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: slideHeight,
    width: slideWidth,
  },
});

export default memo(ListItemImage);
