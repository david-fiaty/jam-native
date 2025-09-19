import React, { memo, useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
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

const SearchProfilesList = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const prevSearchState: any = useRef(null);
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

    let moreResults: any[] = await SearchManager.loadMoreResults('profile', currentPage);
    moreResults = SearchManager.getTabResults('profile', searchState.currentTab, { jam: moreResults });

    setListData((prevData) => [...(prevData || []), ...moreResults]);

    setCurrentPage((prevPage: number) => prevPage + 1);
    setIsFetching(false);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 0;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      fetchListData();
    }
  };

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});

      prevSearchState.current = searchState;
    }
  }, [searchState]);

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
        {!!listData?.length && (
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

      {isLoaded && isFetching && (
        <View style={styles.loadingMore}>
          <SpinnerView size="small" color="white" />
        </View>
      )}
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
  loadingMore: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base,
    backgroundColor: Layout.colors.primary,
    opacity: 0.75,
    position: 'absolute',
    bottom: 40, // Todo - Make dynamic
    right: 0,
    left: 0,
  },
});

export default memo(SearchProfilesList);
