import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import JamListItem from "./list-item/JamListItem";
import SectionManager from "@/manager/SectionManager";

type Props = {
  resource?: string;
  field?: string;
  title?: any;
  idArray?: any;
  addButton?: boolean;
  allButton?: boolean;
  isAddable?: boolean;
  isDeletable?: boolean;
  multiSelect?: boolean;
  emptyMessage?: any;
  onAddButtonPress?: () => void,
  onListItemPress?: (row: any) => void;
};

const ProfileJamsList = ({ resource, field, title, idArray, addButton, allButton, isAddable, isDeletable, multiSelect, emptyMessage, onAddButtonPress, onListItemPress }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const dispatch = useDispatch();
  const [profileJams, setProfileJams] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<any>([]);

  const onItemPress = (row: any) => {
    if (onListItemPress) {
      onListItemPress(row);
    }
    else if (isDeletable !== true) {
      SectionManager.push(router, 'jam-item', { 
        jamId: JSON.stringify([row?.item?.id]), 
        title: row?.item?.title,
        disableInfiniteScroll: true,
      });
    }
    else {
      toggleItem(row);
    }
  };

  const toggleItem = (row: any) => {
    if (multiSelect === true) {
      let selectedIdsList = [...selectedIds];
      let index: number = selectedIdsList.findIndex((id: any) => id == row.item.id);

      if (index === -1) selectedIdsList.push(row.item.id);
      else selectedIdsList.splice(index, 1);

      setSelectedIds(selectedIdsList);
    }
    else {
      setSelectedIds([row.item.id]);
    }
  };

  const deleteItem = (row: any) => {
    let itemIds: any[] = [...selectedIds].filter((n: number) => n !== row.item.id);

    setSelectedIds(itemIds);
    
    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: itemIds, 
    }));
  };

  useEffect(() => {
    (async () => {
      if (!profileJams?.length && Array.isArray(idArray) && idArray?.length > 0) {
        let jams: any = await EntityManager.getJams(idArray);

        if (addButton === true) {
          jams.push({ id: "addItem" });
        }

        setProfileJams(jams);
      }
    })();
  }, [idArray, profileJams, addButton]);

  if (!profileJams) return <SpinnerView />; 

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between" style={styles.title}>
        { title && <TextView>{title}</TextView> }

        { profileJams?.length > 0 && allButton && (
          <TouchableOpacity onPress={() => SectionManager.push(router, 'jams', { idArray: idArray }, i18n.t('Your Jams'))}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity> 
        )}
      </BoxView>
    
      <ListView
        data={profileJams}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        scrollEnabled={false}
        emptyMessage={<TextView>{i18n.t('No data available.')}</TextView>}
        renderItem={(row: any) => (
          <JamListItem 
            row={row} 
            isAddable={isAddable}
            isDeletable={isDeletable}
            multiSelect={multiSelect}
            onAddButtonPress={onAddButtonPress}
            onListItemPress={(row: any) => onItemPress(row)}
            onDeleteItemPress={deleteItem}
            isSelected={(selectedIds.findIndex((id: any) => id == row.item.id)) !== -1}
          />
        )}
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

export default ProfileJamsList;
