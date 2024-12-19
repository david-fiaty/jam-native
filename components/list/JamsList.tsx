import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import { BaseProps } from "@/constants/Types";
import moment from "moment";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import CollapsibleView from "../view/CollapsibleView";
import SpinnerView from "../view/SpinnerView";
import JamStatusButton from "../button/JamStatusButton";
import ListView from "../view/ListView";
import ImageSlideshow from "../slideshow/ImageSlideshow";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from "@/manager/EntityManager";
import StaticData from "@/constants/StaticData";

type Props = BaseProps & {
  idArray?: any,
  showSpinner?: boolean,
};

const JamsList = ({idArray, showSpinner}: Props) => {
  const router = useRouter();
  const [jamsData, setJamsData] = useState<any>([]);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isLoggedIn = UserManager.isLoggedIn();

  const renderItemHeader = (row: any) => (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.listItemHeader}
    >
      <BoxView>
        <TouchableOpacity
          onPress={() =>
            isLoggedIn
              ? ScreenManager.toggleModal("HostsList", row?.item?.id)
              : router.push("/login")
          }
        >
          <TextView>
            @{i18n.t("host")} +{parseInt(row?.item?.collaborators?.length)}
          </TextView>
        </TouchableOpacity>
      </BoxView>
      <BoxView>
        <JamStatusButton active={row?.item?.is_active} />
      </BoxView>
      <BoxView>
        <IconView
          name="actions"
          theme="clear"
          onPress={() =>
            isLoggedIn
              ? ScreenManager.toggleModal("MoreJamView", row?.item?.id)
              : router.push("/login")
          }
        />
      </BoxView>
    </BoxView>
  );

  const renderItemImages = (row: any) => {
    return <ImageSlideshow data={row?.item.medias} />
  };

  const renderItemToolbar = (row: any) => (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.listItemToolbar}
    >
      {/* Jammers button */}
      <BoxView
        direction="row"
        align="center"
        onPress={() =>
          isLoggedIn
            ? ScreenManager.toggleModal("JammersList", row?.item?.id)
            : router.push("/login")
        }
      >
        <IconView name="users" theme="tertiary" />
        <TextView>
          {parseInt(row?.item?.jammers?.length)} {i18n.t("jammers")}
        </TextView>
      </BoxView>

      <BoxView direction="row" align="center">
        {/* Save button */}
        <IconView
          name="save"
          theme="tertiary"
          onPress={() =>
            isLoggedIn
              ? ScreenManager.toggleModal("SavedJamAction", row?.item?.id)
              : router.push("/login")
          }
        />

        {/* Share button */}
        <IconView
          name="share"
          theme="tertiary"
          onPress={() =>
            isLoggedIn
              ? EntityManager.shareJam(row?.item?.id)
              : router.push("/login")
          }
        />
      </BoxView>
    </BoxView>
  );

  const renderItemTitle = (row: any) => (
    row?.item?.title?.length > 0 &&
    <BoxView style={styles.listItemTitle}>
      <TextView style={styles.listItemTitleText}>{row?.item?.title}</TextView>
    </BoxView>
  );

  const renderItemDescription = (row: any) => (
    <BoxView style={styles.listItemDescription}>
      <TextView>{row?.item?.caption}</TextView>
    </BoxView>
  );

  const renderItemCollapsible = (row: any) => (
    <BoxView style={styles.listItemCollapsible}>
      <CollapsibleView
        label={<TextView>{i18n.t("View more.")}</TextView>}
        openedLabel={<TextView>{i18n.t("View less.")}</TextView>}
        content={
          <BoxView
            direction="column"
            align="flex-start"
            style={styles.listItemDetails}
          >
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.listItemDetail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Location")}: { StaticData.locationTypes.find((o: any) => o.id == row?.item?.location_type)?.label || i18n.t('Unavailable') }
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.listItemDetail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Start")}:{" "}
                {moment(row?.item?.period?.start_datetime).format(Config.dateFormat) || i18n.t('Unavailable')}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.listItemDetail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("End")}:{" "}
                {moment(row?.item?.period?.end_datetime).format(Config.dateFormat) || i18n.t('Unavailable')}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.listItemDetail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Industry")}: { sectorsData.find((o: any) => o.id == row?.item?.sectors?.[0])?.name || i18n.t('Unavailable')}
              </TextView>
            </BoxView>
            <BoxView
              direction="row"
              align="center"
              justify="flex-start"
              style={styles.listItemDetail}
            >
              <IconView name="arrow" size={14} theme="transparent" />
              <TextView>
                {i18n.t("Sector")}: {row?.item?.sectors?.[0]?.name || i18n.t('Unavailable')}
              </TextView>
            </BoxView>
          </BoxView>
        }
      />
    </BoxView>
  );

  const renderItem = (row: any) => (
    <View style={styles.listItem}>
      {renderItemHeader(row)}
      {renderItemImages(row)}
      {renderItemToolbar(row)}
      {renderItemTitle(row)}
      {renderItemDescription(row)}
      {renderItemCollapsible(row)}
    </View>
  );

  useEffect(() => {
    (async () => {
      if (!sectorsData?.length) setSectorsData(await EntityManager.getSectors());
      if (!jamsData?.length && idArray?.length) setJamsData(await EntityManager.getJams({items_ids: idArray}));
      if (!jamsData?.length && !idArray?.length) setJamsData(await EntityManager.listJams());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded && showSpinner) return <SpinnerView />;

  return (
    <BoxView direction="column" style={Layout.screenContent}>
      <ListView
        data={jamsData}
        initialNumToRender={jamsData?.length}
        initialScrollIndex={0}
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => renderItem(row)}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base * 1.5,
    borderColor: Colors.primary,
  },
  listItemHeader: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base / 2,
  },
  listItemToolbar: {
    padding: Layout.space.base,
  },
  listItemTitle: {
    padding: Layout.space.base,
    paddingBottom: 0,
  },
  listItemDescription: {
    padding: Layout.space.base,
  },
  listItemCollapsible: {
    padding: Layout.space.base,
  },
  listItemTitleText: {
    fontSize: 16,
  },
  listItemImage: {
    height: 300,
    backgroundColor: Colors.secondary,
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

export default JamsList;
