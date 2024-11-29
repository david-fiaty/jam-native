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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => (
    <BoxView style={styles.listItemCollapsible}>
      <CollapsibleView
        label={i18n.t("View more.")}
        openedLabel={i18n.t("View less.")}
        content={
          <BoxView
            direction="column"
            align="flex-start"
            style={styles.listItemDetails}
          >
            <TextView>{row?.item?.name}</TextView>
          </BoxView>
        }
      />
    </BoxView>
  );

  if (!sectorsData) {
    EntityManager.getSectors().then((data: any) => {
      console.log(data);
      //setSectorsData(data);
      setIsLoaded(true);
    });
  }

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
    padding: Layout.space.base,
  },
  listItemDetails: {
    gap: Layout.space.base,
    width: "100%",
  },
  listItemDetail: {
    width: "100%",
    gap: 0,
    backgroundColor: Colors.secondary,
    padding: Layout.space.base / 6,
    borderRadius: Layout.radius.round,
  },
});

export default SectorsList;
