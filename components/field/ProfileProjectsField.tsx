import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import MediaManager from "@/manager/MediaManager";
import AddItemButton from "../button/AddItemButton";
import ModalManager from "@/manager/ModalManager";
import IconView from "../view/IconView";

type Props = {
  idArray?: any;
  isPublic?: boolean;
  emptyMessage?: any;
  addable?: boolean;
  selectable?: boolean;
  onItemPress?: (row: any) => void;
};

const numColumns = 3;

const ProfileProjectsField = ({ idArray, isPublic, emptyMessage, addable, selectable, onItemPress }: Props) => {
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [profileProjects, setProfileProjects] = useState<any[]>([]);
  const imageSize = MediaManager.getThumbnailSize();

  const onPressEvent = (row: any) => {
    if (onItemPress && selectable) {
      let idArray: any[] = [...(selectedIds || [])];

      if (idArray.includes(row.item.id)) {
        idArray = idArray.filter((id: any)=> id != row.item.id);
      }
      else {
        idArray.push(row.item.id);
      }

      setSelectedIds(idArray);
      onItemPress(idArray);
    } 
    else if (onItemPress) {
      onItemPress(row);
    }
    else {
      ModalManager.toggleModal(isPublic ? 'PublicProjectSection' : 'PrivateProjectSection', {
        projectId: row?.item?.id,
        title: row?.item?.title,
        itemData: JSON.stringify(row?.item),
      });
    }
  };

  const renderAddButton = () => {
    return (
      <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={() => ModalManager.toggleModal('ProjectFormSection', {
          projectId: null,
          title: i18n.t('Add pppproject'),
        })}
      />
    );
  };

  const renderItem = (row: any) => {
    let output: any = null;
    let imageUrl: any = row?.item?.firstJam?.medias?.[0]?.url;

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
      <TouchableOpacity onPress={() => onPressEvent(row)}>
        {output}

        {true && (
          <View style={styles.selectedItem}>
            <IconView name="checkmark" theme="primary" size={12} padding={3.5} />
          </View> 
        )} 
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
        let projectsData: any = await EntityManager.addProjectsImages(await getProfileProjects(idArray));
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

      {!profileProjects?.length && addable && renderAddButton()}
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
  selectedItem: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ProfileProjectsField;
