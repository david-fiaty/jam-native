import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import MediaManager from '@/manager/MediaManager';
import AddItemButton from '../button/AddItemButton';
import i18n from '@/translation/i18n';
import SpinnerView from '../view/SpinnerView';
import EntityManager from '@/manager/EntityManager';
import ModalManager from '@/manager/ModalManager';
import IconView from '../view/IconView';

const numColumns = 3;
const resource: string = 'project';

type Props = {
  idArray?: any;
  isPublic?: boolean;
  addable?: boolean;
  deletable?: boolean;
  emptyMessage?: any;
};

const ProjectJamsField = ({ idArray, isPublic, emptyMessage, addable, deletable }: Props) => {
  const dispatch = useDispatch();
  const [projectJams, setProjectJams] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<any>(0);
  const userState: any = useSelector((state: any) => state.user, shallowEqual);
  const formData: any = useSelector((state: any) => state.form[resource], shallowEqual);
  const imageSize = MediaManager.getThumbnailSize();

  const onItemPress = (row: any) => {
    if (isPublic || !deletable) {
      ModalManager.toggleModal('PublicJamSection', {
        jamId: row?.item?.id,
        title: row?.item?.title,
        itemData: JSON.stringify(row.item),
      });
    }
    else if (deletable) {
      setDeleteId(row.item.id);
    }
  };

  const deleteItem = () => {
    let selectedIds: any[] = [...(formData?.jams_ids || [])];
    selectedIds = selectedIds.filter((id: number) => id != deleteId);

    dispatch(setFormData<any>({
      resource: resource,
      key: 'jams_ids',
      value: selectedIds,
    }));

    setDeleteId(0);
  };

  const renderAddButton = () => {
    return (
      <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={() => {
          ModalManager.toggleModal("SelectProjectJamsForm", {
            field: 'jams_ids',
            idArray: JSON.stringify(userState.profileData?.profile_jams || []),
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

        {deleteId == row?.item?.id && (
          <View style={styles.deleteIcon}>
            <IconView
              name="delete"
              theme="primary"
              size={12}
              padding={3.5}
              onPress={deleteItem}
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
      
        setProjectJams(await getProjectJams(idArray));
    
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
    top: Layout.space.base / 2,
    right: Layout.space.base / 2,
  }
});

export default ProjectJamsField;
