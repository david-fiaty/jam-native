import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setJamData } from "@/redux/slices/AddJamSlice";
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
import InputTextField from "../field/InputTextField";
import CollapsibleView from "../view/CollapsibleView";

const SectorsList = () => {
  //const dispatch = useDispatch();
  //const jamData = useSelector((state: any) => state.addJam);
  const [sectorsData, setSectorsData] = useState<any>(null);
  const [selectedSectors, setSelectedSectors] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const toggleSelection = (item: any, subItem: any) => {
    let pair = [item.id, subItem.id];
    let found = selectedSectors.find((item: any) => JSON.stringify(item) === JSON.stringify(pair));
    let sectorsList = [...selectedSectors];

    if (!found) {
      sectorsList.push(pair);
      setSelectedSectors(sectorsList);
    }
    else {
      let index = selectedSectors.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(pair));
      if (index !== -1) {
        delete sectorsList[index];
        sectorsList = sectorsList.filter((item: any) => item);
        setSelectedSectors(sectorsList);
      } 
    }
  };

  const renderItem = (row: any) => {
    return (
      <BoxView style={styles.listItemCollapsible}>
        <CollapsibleView
          label={row?.item?.name}
          openedLabel={row?.item?.name}
          content={
            <BoxView
              direction="column"
              align="flex-start"
              style={styles.listItemDetails}
            >
              {row?.item?.sub_sectors?.length > 0 &&
                row?.item?.sub_sectors?.map((subItem: any) => {
                  return (
                    <TouchableOpacity onPress={() => toggleSelection(row.item, subItem)} >
                      <BoxView direction="row" align="center" justify="space-around">
                        <IconView name="return" theme="clear" />
                        <TextView key={subItem?.id} style={styles.listSubItem}>
                          {subItem?.name}
                        </TextView>
                      </BoxView>
                    </TouchableOpacity>
                  );
                })
              }
            </BoxView>
          }
        />
      </BoxView>
    );
  };

  //if (!sectorsData) {
    EntityManager.getSectors().then((data: any) => {
      setSectorsData(data);
      setIsLoaded(true);
    });
  //}

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

      <View style={Layout.borderedListContainer}>
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
  listItemCollapsible: {
    paddingHorizontal: Layout.space.base/2,
    paddingVertical: Layout.space.base/1.2,
  },
  listItemDetails: {
    gap: Layout.space.base,
    width: '100%',
  },
  listSubItem: {
    marginLeft: 0,
    paddingVertical: Layout.space.base/2.2,
  },
});

export default SectorsList;
