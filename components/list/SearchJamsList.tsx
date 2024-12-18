import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";

type Props = {
  data?: any,
};

const SearchJamsList = ({ data }: Props) => {
  const numColumns = 3;
  const router = useRouter();

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;

    if (!row?.item?.medias?.[0]?.url) {
      output = (
        <NoImageView
          width={imageSize.width}
          height={imageSize.height}
          rounded={true}
        />
      );
    } else {
      output = (
        <View style={styles.item}>
          <ImageView
            uri={MediaManager.getImageUrl(row.item.medias[0].url)}
            width={imageSize.width}
            height={imageSize.height}
            resizeMode="cover"
            style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
          />
        </View>
      );
    }

    if (parseInt(row?.item?.id) > 0) {
      output = (
        <TouchableOpacity
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
      );
    }

    return output;
  };

  return (
    <View>
      {data?.length > 0 && (
        <View style={styles.container}>
          <ListView
            data={data}
            numColumns={numColumns}
            contentContainerStyle={{ gap: Layout.space.base }}
            columnWrapperStyle={{ gap: Layout.space.base }}
            scrollEnabled={false}
            renderItem={(row: any) => renderItem(row)}
          />
        </View>
      )}

      {!data?.length && (
        <View style={Layout.borderedListContainer}>
          <TextView>{i18n.t("No results found for this search.")}</TextView>
        </View>
      )}
    </View>
  );
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

export default SearchJamsList;
