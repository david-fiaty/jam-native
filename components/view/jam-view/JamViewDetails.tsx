import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import ListItemCollapsible from "@/components/list/jams-list/ListItemCollapsible";
import IconView from "@/components/view/IconView";
import StaticData from "@/constants/StaticData";
import i18n from "@/translation/i18n";
import DataManager from "@/manager/DataManager";

type Props = {
  row?: any;
  sectorsData?: any;
};

const JamViewDetails = ({ row, sectorsData }: Props) => {

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;

    let truncated = text.slice(0, maxLength);
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    return truncated + '...';
  };

  const renderPreview = () => {
    let previewText: string = '';

    if (row?.caption?.length > 0) {
      previewText = row?.caption.trim().replace(/[\t\n\r]+/g, ' ');
      previewText = truncateText(previewText, 86);
    }

    return (
      row?.caption?.length > 0 && (
        <BoxView style={styles.descriptionContainer}>
          {row?.title?.length > 0 && <TextView>{row.item.title}</TextView>}
          <TextView>{previewText}</TextView>
        </BoxView>
      )
    );
  };

  const renderDescription = () => {
    return (
      row?.caption?.length > 0 && (
        <BoxView style={styles.descriptionContainer}>
          {row?.title?.length > 0 && <TextView>{row.item.title}</TextView>}
          <TextView>{row?.caption}</TextView>
        </BoxView>
      )
    );
  };

  const renderLocation = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("Location")} `}</TextView>
          {StaticData.locationTypes.find(
            (o: any) => o.id == row?.location_type
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
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("Start")} `}</TextView>
          {DataManager.formatDate(row?.period?.start_datetime) || i18n.t("Unavailable")}
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
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("End")} `}</TextView>
          {DataManager.formatDate(row?.period?.end_datetime) || i18n.t("Unavailable")}
        </TextView>
      </BoxView>
    );
  };

  const renderSector = () => {
    let firstSector: any = sectorsData?.find((o: any) => o.id == row?.sectors?.[0]);

    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("Industry")} `}</TextView>
          {firstSector ? firstSector?.name : i18n.t("Unavailable")}
        </TextView>
      </BoxView>
    );
  };

  const renderSubsector = () => {
    let firstSector: any = sectorsData?.find((o: any) => o.id == row?.sectors?.[0]);

    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.detail}
      >
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("Sector")} `}</TextView>
          {firstSector ? firstSector?.sub_sectors[0]?.name : i18n.t("Unavailable")}
        </TextView>
      </BoxView>
    );
  };

  return (
    <BoxView style={styles.container}>
      <ListItemCollapsible
        label={<TextView>{i18n.t("View more.")}</TextView>}
        openedLabel={<TextView>{i18n.t("View less.")}</TextView>}
        preview={renderPreview()}
        content={
          <BoxView
            direction="column"
            align="flex-start"
            style={styles.detailsContainer}
          >
            {renderDescription()}
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
    paddingTop: 0,
    paddingBottom: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
  descriptionContainer: {
    margin: 0,
    padding: 0,
  },
  detailsContainer: {
    gap: Layout.space.base,
    width: "100%",
  },
  detail: {
    width: "100%",
    gap: 0,
    backgroundColor: Layout.colors.secondary,
    paddingVertical: Layout.space.base / 2,
    paddingHorizontal: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
  detailLabel: {
    fontWeight: 'bold',
  }
});

export default JamViewDetails;
