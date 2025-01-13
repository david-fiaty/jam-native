import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import i18n from "@/translation/i18n";
import ImageView from "@/components/view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import AddItemButton from "@/components/button/AddItemButton";
import NoImageView from "@/components/view/NoImageView";
import MediaManager from "@/manager/MediaManager";

type Props = BaseProps & {
  row?: any;
  onAddButtonPress?: () => void;
};

const JamListItem = ({ row, onAddButtonPress }: Props) => {
  const numColumns = 3;
  const router = useRouter();

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;

    if (row?.item?.id == "addItem") {
      output = <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={onAddButtonPress}
      />;
    }
    else if (!row?.item?.medias?.[0]?.url) {
      output = <NoImageView 
        width={imageSize.width} 
        height={imageSize.height} 
        rounded={true}
      />;
    }
    else {
      output = <View style={styles.item}>
        <ImageView
          uri={MediaManager.getImageUrl(row.item.medias[0].url)}
          width={imageSize.width}
          height={imageSize.height}
          resizeMode="cover"
          style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
        />
      </View>
    }

    if (parseInt(row?.item?.id) > 0) {
      output = <TouchableOpacity
        key={row.item.id}
        onPress={() =>
          router.push({
            pathname: "/jam",
            params: { idArray: [row.item.id], title: row.item.title },
          })
        }
      >
        {output}
      </TouchableOpacity>
    }

    return output;
  }

  return renderItem(row);
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginBottom: Layout.space.base,
    flex: 1,
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default JamListItem;
