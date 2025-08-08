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
import AddItemButton from "../button/AddItemButton";
import ModalManager from "@/manager/ModalManager";

type Props = {
  idArray?: any;
  isPublic?: boolean;
  emptyMessage?: any;
  addable?: boolean;
};

const numColumns = 3;

const ProfileProjectsField = ({ idArray, isPublic, emptyMessage, addable }: Props) => {
  const router = useRouter();
  const [profileProjects, setProfileProjects] = useState<any[]>([]);
  const imageSize = MediaManager.getThumbnailSize();

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'profile-projects', {
      projectId: JSON.stringify([row?.item?.id]),
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
        onPress={() => SectionManager.push(router, 'add-project')}
      />
    );
  };

  const renderItem = (row: any) => {
    let output: any = null;
    //let imageUrl: any = EntityManager.getProjectImageUrl(row.item); // Todo - Get project image
    let imageUrl: any = null;

    if (row?.item?.id == "addItem") {
      output = renderAddButton();
    }
    else if (!imageUrl || imageUrl == 'undefined') {
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
            uri={MediaManager.getImageUrl(imageUrl)}
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

  const getProfileProjects = async (entityIds: any[]) => {
    let data: any[] = await EntityManager.getProjects(entityIds);

    if (!isPublic && addable) {
      data.push({ id: "addItem" });
    }

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!profileProjects?.length && Array.isArray(idArray) && idArray?.length > 0) {
        let projectsData: any = await getProfileProjects(idArray);
        setProfileProjects(projectsData);
      }
    })();
  }, [idArray, profileProjects, isPublic]);

  if (!profileProjects) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      {profileProjects?.length > 0 && (
        <ListView
          data={profileProjects}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          emptyMessage={<TextView>{emptyMessage}</TextView>}
          renderItem={(row: any) => renderItem(row)}
        />
      )}

      {!profileProjects?.length && (renderAddButton())}
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

export default ProfileProjectsField;
