import React, { memo, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";
import ScreenManager from "@/manager/ScreenManager";
import UserManager from "@/manager/UserManager";
import TextView from "../view/TextView";
import ProfileListItemView from "../view/ProfileListItemView";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "../view/SpinnerView";
import LoadingMoreView from "../view/LoadingMoreView";

const SearchProfilesList = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cycle, setCycle] = useState(0);
  const [listData, setListData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'public-profile', {
      profileId: row?.item?.id,
      itemData: JSON.stringify(row?.item),
      title: i18n.t("{{ name }}'s profile", { name: UserManager.getProfileDisplayName(row?.item) }),
    });
  };

  const renderItem = (row: any) => {
    return (
      <ProfileListItemView
        row={row}
        onListItemPress={(row: any) => onItemPress(row)}
      />
    );
  };

  const fetchListData = async () => {
    if (isFetching) return;
    setIsFetching(true);

    let moreResults: any[] = await SearchManager.loadMoreResults('profile', currentPage, searchState.currentTab);

    if (!moreResults?.length && !!Config.infiniteScroll) {
      moreResults = await SearchManager.loadMoreResults('profile', 1, searchState.currentTab);

      setCycle((prev) => prev + 1);
      setListData((prevData) => [
        ...(prevData || []),
        ...moreResults.map((item) => ({ ...item, cycle: cycle + 1 })),
      ]);
      
      setCurrentPage(2);
    }
    else {
      setListData((prevData) => [...(prevData || []), ...moreResults]);
      setCurrentPage((prevPage: number) => prevPage + 1);
    }

    setIsFetching(false);
  };

  const handleScroll = (event: any) => {
    ScreenManager.handleScrollEvent(event, fetchListData);
  };

  useEffect(() => {
    if (!isLoaded) setIsLoaded(true);
    fetchListData();
  }, [isLoaded]);

  return (
    <>
      <BoxView
        direction="column"
        align="flex-start"
        justify="flex-start"
        scroll={ScreenManager.isWeb() ? true : false}
        style={styles.container}
      >
        {isLoaded && !!listData?.length && (
          <ListView
            data={listData}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={(row: any) => renderItem(row)}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        )}

        {isLoaded && !isFetching && !listData?.length && (
          <TextView>{i18n.t('No results available')}</TextView>
        )}
      </BoxView>

      {isLoaded && isFetching && <LoadingMoreView />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexShrink: 1,
  },
  contentContainerStyle: {
    gap: Layout.space.base,
    paddingBottom: Layout.space.base,
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

export default memo(SearchProfilesList);
