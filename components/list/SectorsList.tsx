import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from "@/manager/EntityManager";
import CollapsibleView from "../view/CollapsibleView";

const SectorsList = () => {
  const dispatch = useDispatch();
  const [sectorsData, setSectorsData] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const updateSelection = (item: any, subItem: any) => {
    let selection: any[] = [...selectedIds];
    let itemIndex: number = selection.findIndex((id: any) => id == item.id);
    let subItemIndex: number = selection.findIndex((id: any) => id == subItem.id);



    //let itemIndex: number = idArray.findIndex((value: any) => value == itemId);
    //let subItemIndex: number = idArray.findIndex((value: any) => value == subItemId);


    /*
    let pair = [item.id, subItem.id];
    let found = selectedIds.find((item: any) => JSON.stringify(item) === JSON.stringify(pair));
    let sectorsList = [...selectedIds];

    if (!found) {
      sectorsList.push(pair);
      setSelectedIds(sectorsList);
    }
    else {
      let index = selectedIds.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(pair));
      if (index !== -1) {
        delete sectorsList[index];
        sectorsList = sectorsList.filter((item: any) => item);
        setSelectedIds(sectorsList);
      } 
    }
      */
  };

  const renderSubItem = (item: any, subItem: any) => {
    let pair = [item.id, subItem.id];
    let isSelected = selectedIds.find((item: any) => JSON.stringify(item) === JSON.stringify(pair));

    return (
      <TouchableOpacity 
        key={subItem?.id}
        onPress={() => updateSelection(item, subItem)} 
      >
        <BoxView direction="row" align="center" justify="space-around">
          <IconView name="arrow" theme="clear" />
          <TextView key={subItem?.id} style={styles.listSubItem}>
            {subItem?.name}
          </TextView>
          
          {isSelected && <IconView name="checkmark" theme="clear" size={14} /> }
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
      if (!sectorsData) setSectorsData(await EntityManager.getSectors());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Add industries')}
        onPress={() => ScreenManager.toggleModal('AddJamForm')}
      />

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
    width: '100%'
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
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
  itemHeaderOpened: {
    backgroundColor: Colors.secondary,
  },
});

export default SectorsList;
