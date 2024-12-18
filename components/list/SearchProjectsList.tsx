import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";

type Props = {
  data?: any,
};

const SearchProjectsList = ({ data }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [projectImages, setProjectImages] = useState<any>({});

  const renderItem = (row: any) => {
    let imageSize: any = MediaManager.getThumbnailSize();
    let output: any = null;
    let uri: string = projectImages?.[row?.item?.id];

    if (!uri?.length) {
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
            uri={uri}
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
              pathname: "/project",
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

  useEffect(() => {
    if (data?.length > 0) {
      data.map((item: any) => {
        EntityManager.getProjectImageUrl(item).then((value: any) => {
          if (value && !projectImages?.[item?.id])
            setProjectImages({ ...projectImages, ...{ [item?.id]: value } });
        });
      });
    }
  });

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

export default SearchProjectsList;
