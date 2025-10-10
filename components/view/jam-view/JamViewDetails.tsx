import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import JamViewCollapsible from "./JamViewCollapsible";
import i18n from "@/translation/i18n";
import DataManager from "@/manager/DataManager";
import EntityManager from "@/manager/EntityManager";
import SectorsViewField from "@/components/field/SectorsViewField";
import SubSectorsViewField from "@/components/field/SubSectorsViewField";

type Props = {
  row?: any;
  sectorsData?: any;
};

const JamViewDetails = ({ row, sectorsData }: Props) => {

  const renderPreview = () => {
    let previewText: string = '';

    if (row?.caption?.length > 0) {
      previewText = row?.caption.trim().replace(/[\t\n\r]+/g, ' ');
      previewText = DataManager.truncateText(previewText, 86);
    }

    return (
      row?.caption?.length > 0 && (
        <BoxView style={styles.descriptionContainer}>
          {row?.title?.length > 0 && <TextView>{row?.title}</TextView>}
          <TextView>{previewText}</TextView>
        </BoxView>
      )
    );
  };

  const renderDescription = () => {
    return (
      row?.caption?.length > 0 && (
        <BoxView style={styles.descriptionContainer}>
          {row?.title?.length > 0 && <TextView>{row?.title}</TextView>}
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
          {EntityManager.getLocationTypes().find(
            (o: any) => o.id == row?.location_type
          )?.name || i18n.t("Unavailable")}
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
          {DataManager.toDbDate(row?.period?.start_datetime) || i18n.t("Unavailable")}
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
          {DataManager.toDbDate(row?.period?.end_datetime) || i18n.t("Unavailable")}
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
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("Industries")} `}</TextView>
          <SectorsViewField idArray={row?.sectors || []} />
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
        <TextView>
          <TextView style={styles.detailLabel}>{`${i18n.t("Sectors")} `}</TextView>
          <SubSectorsViewField idArray={row?.sectors || []} />
        </TextView>
      </BoxView>
    );
  };

  return (
    <BoxView style={styles.container}>
      <JamViewCollapsible
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
