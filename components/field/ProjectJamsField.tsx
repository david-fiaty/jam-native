import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router";
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import SectionManager from '@/manager/SectionManager';
import MediaManager from '@/manager/MediaManager';
import AddItemButton from '../button/AddItemButton';
import i18n from '@/translation/i18n';
import SpinnerView from '../view/SpinnerView';
import EntityManager from '@/manager/EntityManager';
import ModalManager from '@/manager/ModalManager';
import IconView from '../view/IconView';

const numColumns = 3;

type Props = {
  idArray?: any;
  isPublic?: boolean;
  addable?: boolean;
  deletable?: boolean;
  emptyMessage?: any;
};

const ProjectJamsField = ({ idArray, isPublic, emptyMessage, addable, deletable }: Props) => {
  const router = useRouter();
  const [projectJams, setProjectJams] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const imageSize = MediaManager.getThumbnailSize();

  const onItemPress = (row: any) => {
    if (isPublic || !deletable) {
      SectionManager.push(router, 'project-jams', {
        jamId: JSON.stringify([row.item.id]),
        title: row?.item?.title,
      });
    }
    else if (deletable) {
      updateSelection(row);
    }
  };

  const updateSelection = (row: any) => {
    let selection: any[] = [...selectedItems];

    if (selection.includes(row.item.id)) {
      selection = selection.filter((id: number) => id != row.item.id)
    }
    else {
      selection.push(row.item.id);
    }

    setSelectedItems(selection);
  };

  const deleteItem = (row: any) => {
    // Todo - Implement delete item logic
    console.log('delete item', row.item.id);

  };

  const renderAddButton = () => {
    return (
      <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={() => {
          ModalManager.toggleModal("SelectJamsForm", {
            field: 'jams_ids',
            idArray: JSON.stringify(idArray || []),
            multiSelect: true,
            resource: 'project', // Todo - Make dynamic
          })
        }}
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
      <TouchableOpacity
        onPress={() => onItemPress(row)}
        style={styles.item}
      >
        {output}

        {selectedItems.includes(row?.item?.id) && (
          <View style={styles.deleteIcon}>
            <IconView
              name="delete"
              theme="primary"
              size={12}
              padding={3.5}
              onPress={() => deleteItem(row)}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const getProjectJams = async (entityIds: any[]) => {
    let data: any[] = await EntityManager.getJams(entityIds);

    if (!isPublic && addable) {
      data.push({ id: "addItem" });
    }

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!projectJams?.length && Array.isArray(idArray) && idArray?.length > 0) {
        setProjectJams(await getProjectJams(idArray));
      }
    })();
  }, [idArray, projectJams, isPublic]);

  if (!projectJams) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      {projectJams?.length > 0 && (
        <ListView
          data={projectJams}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          emptyMessage={<TextView>{emptyMessage}</TextView>}
          renderItem={(row: any) => renderItem(row)}
        />
      )}

      {!projectJams?.length && !isPublic && (renderAddButton())}
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
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: Layout.space.base/2,
    right: Layout.space.base/2,
  }
});

export default ProjectJamsField;
