import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import JamListItem from "../list/list-item/JamListItem";

type Props = {
  resource?: string;
  field?: string;
  idArray?: any;
  addButton?: boolean;
  multiSelect?: boolean;
  emptyMessage?: any;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
};

const SelectJamsForm = ({ resource, field, idArray, addButton, multiSelect, emptyMessage, onAddButtonPress, onListItemPress }: Props) => {
  const numColumns = 3;
  const dispatch = useDispatch();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<any>([]);

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
      if (!isLoaded) {
        let jams: any = [];

        if (idArray && idArray.length) {
          jams = await EntityManager.getJams({ items_ids: idArray });
        }

        if (addButton === true) {
          jams.push({ id: "addItem" });
        }

        setProfileJams(jams);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray, addButton]);

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
        renderItem={(row: any) => (
          <JamListItem 
            row={row} 
            multiSelect={multiSelect}
            isAddable={true}
            onAddButtonPress={onAddButtonPress}
            onListItemPress={(row: any) => onItemPress(row)}
            onDeleteItemPress={deleteItem}
            isSelected={selectedIds.includes(row.item.id)}
          />
        )}
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
});

export default SelectJamsForm;
