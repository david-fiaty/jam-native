import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import MediaManager from "@/manager/MediaManager";
import IconView from "../view/IconView";

type Props = {
  resource?: any;
  field?: any;
  idArray?: any;
  multiSelect?: boolean;
  emptyMessage?: any;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
};

const numColumns = 3;

const SelectProjectJamsForm = ({ resource, field, idArray, multiSelect, emptyMessage, onAddButtonPress, onListItemPress }: Props) => {
  const dispatch = useDispatch();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource], shallowEqual);
  const imageSize = MediaManager.getThumbnailSize();

  if (idArray?.length > 0 && !Array.isArray(idArray)) idArray = JSON.parse(idArray);

  const onItemPress = (row: any) => {
    if (onListItemPress) {
      onListItemPress(row);
    }
    else {
      toggleItem(row);
    }
  };

  const toggleItem = (row: any) => {
    let selectedIds: any[] = [...(formData?.[field] || [])];

    if (multiSelect === true) {
      let index: number = selectedIds.findIndex((id: any) => id == row.item.id);

      if (index === -1) selectedIds.push(row.item.id);
      else selectedIds.splice(index, 1);

    }
    else {
      selectedIds = [row.item.id];
    }

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
  };

  const deleteItem = (row: any) => {
    let itemIds: any[] = [...(formData?.[field] || [])].filter((n: number) => n !== row.item.id);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: itemIds,
    }));
  };

  const renderItem = (row: any) => {
    let selectedIds: any[] = [...(formData?.[field] || [])];
    let output: any = null;
    let imageUrl: any = row?.item?.medias?.[0]?.url;
    let isSelected: boolean = selectedIds.find((id: any) => id == row.item.id);

    output = MediaManager.renderImage(imageUrl, {
      numColumns: numColumns,
      imageSize: imageSize,
    });

    return (
      <TouchableOpacity
        onPress={() => onItemPress(row)}
      >
        {output}

        {isSelected &&
          <View style={styles.selectedItem}>
            <IconView name="checkmark" theme="primary" size={12} padding={3.5} />
          </View> 
        } 
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let jams: any = [];

        if (idArray && idArray.length) {
          jams = await EntityManager.getJams(idArray);
        }

        setProfileJams(jams);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray, formData, field]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      style={[Layout.formContainer, styles.container]}
    >
      <ListView
        data={profileJams}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        scrollEnabled={false}
        emptyMessage={<TextView>{i18n.t('No data available.')}</TextView>}
        renderItem={(row: any) => renderItem(row)}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
  selectedItem: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default SelectProjectJamsForm;
