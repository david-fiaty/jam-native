import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import CollapsibleView from "@/components/view/CollapsibleView";
import IconView from "@/components/view/IconView";
import StaticData from "@/constants/StaticData";
import i18n from "@/translation/i18n";
import DataManager from "@/manager/DataManager";

type Props = BaseProps & {
  row?: any,
  sectorsData?: any,
};

const ListItemCollapsible = ({ row, sectorsData }: Props) => {

  const getFirstSector = () => {
    let firstSector: any = sectorsData?.find((o: any) => o.id == row?.item?.sectors?.[0]);

    if (firstSector) {
      return firstSector?.name;
    }

    return i18n.t("Unavailable");
  };
  
  const getFirstSubSector = () => {
    let firstSector: any = sectorsData?.find((o: any) => o.id == row?.item?.sectors?.[0]);

    // Todo - Implement subsectors display 
    //console.log(firstSector?.sub_sectors)

    return firstSector?.name;
  };

  const renderLocation = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <IconView name="arrow" size={12} theme="transparent" />
        <TextView>
          {i18n.t("Location")}:{" "}
          {StaticData.locationTypes.find(
            (o: any) => o.id == row?.item?.location_type
          )?.label || i18n.t("Unavailable")}
        </TextView>
      </BoxView>
    );
  };

  const renderStart = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <IconView name="arrow" size={12} theme="transparent" />
        <TextView>
          {i18n.t("Start")}:{" "}
          {DataManager.formatDate(row?.item?.period?.start_datetime) || i18n.t("Unavailable")}
        </TextView>
      </BoxView>      
    );
  };

  const renderEnd = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <IconView name="arrow" size={12} theme="transparent" />
        <TextView>
          {i18n.t("End")}:{" "}
          {DataManager.formatDate(row?.item?.period?.end_datetime) || i18n.t("Unavailable")}
        </TextView>
      </BoxView>
    );
  };

  const renderSector = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <IconView name="arrow" size={12} theme="transparent" />
        <TextView>
          {i18n.t("Industry")}:{" "}
          {getFirstSector()}
        </TextView>
      </BoxView>
    );
  };

  const renderSubsector = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <IconView name="arrow" size={12} theme="transparent" />
        <TextView>
          {i18n.t("Sector")}:{" "}
          {getFirstSubSector()}
        </TextView>
      </BoxView>
    );
  };

  return (
    <BoxView style={styles.container}>
      <CollapsibleView
        label={<TextView>{i18n.t("View more.")}</TextView>}
        openedLabel={<TextView>{i18n.t("View less.")}</TextView>}
        content={
          <BoxView
            direction="column"
            align="flex-start"
            style={styles.detailsContainer}
          >
            {renderLocation()}
            {renderStart()}
            {renderEnd()}
            {renderSector()}
            {renderSubsector()}
          </BoxView>
        }
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.space.base,
  },
  detailsContainer: {
    gap: Layout.space.base,
    width: "100%",
  },
  detail: {
    width: "100%",
    gap: 0,
    backgroundColor: Colors.secondary,
    padding: Layout.space.base/2,
    borderRadius: Layout.radius.round,
  },
});

export default ListItemCollapsible;
