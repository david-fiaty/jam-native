import { StyleSheet, View } from 'react-native';
import { Layout } from "@/constants/Layout";
import ImageSlideshow from "@/components/slideshow/ImageSlideshow";
import NoImageView from "@/components/view/NoImageView";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  row?: any;
};

const slideHeight: number = Layout.imageSlideshow.height;
const slideWidth: number = (ScreenManager.window.width - Layout.space.base * 3) - 2;

const ListItemImage = ({ row }: Props) => {
  if (!row?.item?.medias?.length) {
    return (
      <View style={styles.container}>
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
  container: {
    height: slideHeight,
    width: slideWidth,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base,
  },
});

export default ListItemImage;
