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
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.detail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Location")}:{" "}
                {StaticData.locationTypes.find(
                  (o: any) => o.id == row?.item?.location_type
                )?.label || i18n.t("Unavailable")}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.detail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Start")}:{" "}
                {DataManager.formatDate(row?.item?.period?.start_datetime) || i18n.t("Unavailable")}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.detail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("End")}:{" "}
                {DataManager.formatDate(row?.item?.period?.end_datetime) || i18n.t("Unavailable")}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.detail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Industry")}:{" "}
                {sectorsData?.find((o: any) => o.id == row?.item?.sectors?.[0])
                  ?.name || i18n.t("Unavailable")}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.detail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Sector")}:{" "}
                {row?.item?.sectors?.[0]?.name || i18n.t("Unavailable")}
              </TextView>
            </BoxView>
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
    padding: Layout.space.base / 6,
    borderRadius: Layout.radius.round,
  },
});

export default ListItemCollapsible;
