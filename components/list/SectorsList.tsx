import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import CollapsibleView from "../view/CollapsibleView";

type Props = {
  resource: string;
  field?: any;
};

const SectorsList = ({ resource, field }: Props) => {
  const dispatch = useDispatch();
  const [sectorsData, setSectorsData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateSelection = (item: any, subItem: any) => {
    let selection: any[] = [...formData?.[field] || []];
    let itemIndex: number = selection.findIndex((id: any) => id == item.id);
    let subItemIndex: number = selection.findIndex((id: any) => id == subItem.id);

    // Update ID pairs
    if (itemIndex === -1 && subItemIndex === -1) {
      selection.push(item.id, subItem.id);
    }
    else if (itemIndex !== -1 && subItemIndex === -1) {
      selection.push(subItem.id);
    }
    else if (itemIndex !== -1 && subItemIndex !== -1) {
      selection.splice(subItemIndex, 1);
    }

    // Remove parents without sub selection
    let itemChildIds: any = item?.sub_sectors?.map((o: any) => o?.id);
    let deleteItem: boolean = !selection.some((id: any) => itemChildIds.includes(id));
    if (deleteItem) {
      let index: number = selection.findIndex((id: any) => id == item.id);
      selection.splice(index, 1);
    }

    // Update selection state
    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selection,
    }));
  };

  const renderSubItem = (item: any, subItem: any) => {
    let isSelected: boolean = formData?.[field]?.includes(subItem.id);

    return (
      <TouchableOpacity 
        key={subItem?.id}
        onPress={() => updateSelection(item, subItem)} 
      >
        <BoxView direction="row" align="center" justify="space-around">
          <IconView name="arrow" theme="clear" size={10} />
          <TextView key={subItem?.id} style={styles.listSubItem}>
            {subItem?.name}
          </TextView>
          
          {isSelected && <IconView name="checkmark" theme="clear" size={15} /> }
        </BoxView>
      </TouchableOpacity>
    );
  };

  const renderItem = (row: any) => {
    return (
      <BoxView style={styles.listItemCollapsible}>
        <CollapsibleView
          label={<TextView>{row?.item?.name}</TextView>}
          openedLabel={<TextView>{row?.item?.name}</TextView>}
          headerStyle={styles.itemHeader}
          content={
            <BoxView
              direction="column"
              align="flex-start"
              style={styles.listItemDetails}
            >
              {row?.item?.sub_sectors?.length > 0 &&
                row?.item?.sub_sectors?.map((subItem: any) => renderSubItem(row?.item, subItem))
              }
            </BoxView>
          }
        />
      </BoxView>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setIsLoaded(true);
      }
    })();
    
  }, [isLoaded, sectorsData]);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.screenContent}
    >
      <View style={styles.container}>
        {sectorsData?.length > 0 && (
          <ListView
            data={sectorsData}
            renderItem={(row: any) => renderItem(row)}
          />
        )}
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listItemCollapsible: {
    paddingHorizontal: Layout.space.base/2,
    paddingVertical: Layout.space.base/1.2,
  },
  listItemDetails: {
    gap: Layout.space.base,
  },
  listSubItem: {
    marginLeft: 0,
    paddingVertical: Layout.space.base/2.2,
  },
  itemHeader: {
    backgroundColor: Layout.colors.secondary,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
  itemHeaderOpened: {
    backgroundColor: Layout.colors.secondary,
  },
});

export default SectorsList;
