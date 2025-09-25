import React, { memo, useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import ListView from "@/components/view/ListView";
import BoxView from "@/components/view/BoxView";
import ScreenManager from "@/manager/ScreenManager";
import MediaManager from "@/manager/MediaManager";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import SpinnerView from "@/components/view/SpinnerView";
import SearchManager from "@/manager/SearchManager";
import LoadingMoreView from "@/components/view/LoadingMoreView";
import ModalManager from "@/manager/ModalManager";

const numColumns = 2;

const SearchJamsList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const imageSize = MediaManager.getThumbnailSize(numColumns);

  const onItemPress = (row: any) => {
    ModalManager.toggleModal('PublicJamSection', {
      jamId: row?.item?.id,
      title: row?.item?.title,
      itemData: JSON.stringify(row?.item),
    });
  };

  const renderItem = (row: any) => {
    let output: any = null;
    let imageUrl: any = row?.item?.medias?.[0]?.url;

    output = MediaManager.renderImage(imageUrl, {
      numColumns: numColumns,
      imageSize: imageSize,
    });

    return (
      <TouchableOpacity onPress={() => onItemPress(row)}>
        {output}
      </TouchableOpacity>
    );
  };

  const fetchListData = async () => {
    if (isFetching) return;

    setIsFetching(true);
    let moreResults: any[] = await SearchManager.loadResults(searchState.currentTab, currentPage);

    setListData((prevData) => [...(prevData || []), ...moreResults]);
    setCurrentPage((prevPage: number) => prevPage + 1);

    setIsFetching(false);
  };

  const handleScroll = (event: any) => {
    ScreenManager.handleScrollEvent(event, fetchListData);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        await fetchListData();
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

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
            numColumns={numColumns}
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={styles.columnWrapperStyle}
            keyExtractor={(row: any, index?: number) => `${row.id}-${index}`}
            renderItem={(row: any) => renderItem(row)}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        )}

        {isLoaded && !isFetching && !listData?.length && (
          <TextView>{i18n.t('No results available')}</TextView>
        )}
      </BoxView>

      {isLoaded && isFetching && !!listData?.length && <LoadingMoreView bottomSpace={Layout.space.base * 2} />}
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
  columnWrapperStyle: {
    gap: Layout.space.base,
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

export default memo(SearchJamsList);
