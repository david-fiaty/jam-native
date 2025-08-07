import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import SectionManager from "@/manager/SectionManager";
import MediaManager from "@/manager/MediaManager";
import NoImageView from "../view/NoImageView";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  idArray?: any;
  isPublic?: boolean;
  emptyMessage?: any;
};

const numColumns = 3;

const ProfileJamsField = ({ idArray, isPublic, emptyMessage }: Props) => {
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any[]>([]);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'jam-item', {
      jamId: JSON.stringify([row?.item?.id]),
      title: row?.item?.title,
      disableInfiniteScroll: true,
    });
  };

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;

    if (!row?.item?.medias?.[0]?.url || row?.item?.medias?.[0]?.url == 'undefined') {
      output = (
        <View style={styles.item}>
          <NoImageView 
            width={imageSize.width} 
            height={imageSize.height} 
            rounded={true}
          />
        </View>
      );
    }
    else {
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

    return (
      <TouchableOpacity onPress={() => onItemPress(row)}>
        {output}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (!profileJams?.length && Array.isArray(idArray) && idArray?.length > 0) {
        setProfileJams(await EntityManager.getJams(idArray));
      }
    })();
  }, [idArray, profileJams, isPublic]);

  if (!profileJams) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      <ListView
        data={profileJams}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        scrollEnabled={false}
        emptyMessage={<TextView>{emptyMessage}</TextView>}
        renderItem={(row: any) => renderItem(row)}
      />
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

export default ProfileJamsField;
