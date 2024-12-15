import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";

type Props = {
  title?: any,
  idArray?: any,
  onAddButtonPress?: () => void,
};

const SearchJamsList = ({ title, idArray }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [jamsData, setJamsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;

    if (!row?.item?.medias?.[0]?.url) {
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
            params: { idArray: [row.item.id], title: title },
          })
        }
      >
        {output}
      </TouchableOpacity>
    }

    return output;
  }

  if (!jamsData?.length && idArray?.length) {
    EntityManager.getJams({ items_ids: idArray }).then((data: any) => {
      setJamsData(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      {jamsData?.length > 0 && (
        <ListView
          data={jamsData}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          renderItem={(row: any) => renderItem(row)}
        />
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
