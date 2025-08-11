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
    let path: string = isPublic ? 'public-project' : 'private-project';
    let params: any = {
      projectId: row?.item?.id,
      title: i18n.t('Project'),
      disableInfiniteScroll: true,
    };

    SectionManager.push(router, path, params);
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
    let imageUrl: any = row.item.firstJam?.medias?.[0]?.url;

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

  const getProfileProjects = async (entityIds: any[]) => {
    let data: any[] = await EntityManager.getProjects(entityIds);

    if (!isPublic && addable) {
      data.push({ id: "addItem" });
    }

    return data;
  };

  const addProjectsImages = async (projectsData: any[]) => {
    return await Promise.all(
      projectsData.map(async (item: any) => {
        if (item.id != 'addItem') {
          return {
            ...item,
            firstJam: (await EntityManager.getJams([item?.jams[0]]))?.[0],
          }
        }
        else {
          return item;
        }
      })
    );
  };

useEffect(() => {
  (async () => {
    if (!profileProjects?.length && Array.isArray(idArray) && idArray?.length > 0) {
      let projectsData: any = await getProfileProjects(idArray);
      projectsData = await addProjectsImages(projectsData);
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
});

export default ProfileProjectsField;
