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
import AddItemButton from "../button/AddItemButton";

const numColumns = 3;

type Props = {
  idArray?: any;
  isPublic?: boolean;
  addable?: boolean;
  emptyMessage?: any;
};

const ProfileJamsField = ({ idArray, isPublic, emptyMessage, addable }: Props) => {
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any[]>([]);
  const imageSize = MediaManager.getThumbnailSize();

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'profile-jams', {
      jamId: JSON.stringify([row?.item?.id]),
      title: row?.item?.title,
      disableInfiniteScroll: true,
    });
  };

  const renderAddButton = () => {
    return (
      <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={() => SectionManager.push(router, 'add-jam')}
      />
    );
  };

  const renderItem = (row: any) => {
    let output: any = null;
    let imageUrl: any = row?.item?.medias?.[0]?.url;

    if (row?.item?.id == "addItem") {
      output = renderAddButton();
    }
    else {
      output = MediaManager.renderImage(imageUrl, {
        numColumns: numColumns,
        imageSize: imageSize,
      });
    }

    return (
      <TouchableOpacity onPress={() => onItemPress(row)}>
        {output}
      </TouchableOpacity>
    );
  };

  const getProfileJams = async (entityIds: any[]) => {
    let data: any[] = await EntityManager.getJams(entityIds);

    if (!isPublic && addable) {
      data.push({ id: "addItem" });
    }

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!profileJams?.length && Array.isArray(idArray) && idArray?.length > 0) {
        setProfileJams(await getProfileJams(idArray));
      }
    })();
  }, [idArray, profileJams, isPublic]);

  if (!profileJams) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      {profileJams?.length > 0 && (
        <ListView
          data={profileJams}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          emptyMessage={<TextView>{emptyMessage}</TextView>}
          renderItem={(row: any) => renderItem(row)}
        />
      )}

      {!profileJams?.length && (renderAddButton())}
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
});

export default ProfileJamsField;
