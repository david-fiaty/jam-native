import React, { memo, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import ListView from "../view/ListView";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";
import ScreenManager from "@/manager/ScreenManager";
import MediaManager from "@/manager/MediaManager";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";
import SpinnerView from "../view/SpinnerView";
import SearchManager from "@/manager/SearchManager";

type Props = {
  data?: any;
};

const numColumns = 2;

const SearchJamsList = ({ data }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const imageSize = MediaManager.getThumbnailSize(numColumns);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'public-jam', {
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

    let moreResults: any[] = await SearchManager.loadMoreResults('jam', currentPage);
    setListData((prevData) => [...(prevData || []), ...moreResults]);

    setCurrentPage((prevPage: number) => prevPage + 1);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isLoaded) setIsLoaded(true);
    fetchListData();
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
            renderItem={(row: any) => renderItem(row)}
            onEndReachedThreshold={0.5}
            onEndReached={fetchListData}
          />
        )}

        {isLoaded && !isFetching && !listData?.length && (
          <TextView>{i18n.t('No results available')}</TextView>
        )}
      </BoxView>

      {isLoaded && isFetching && !!listData?.length && (
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
    paddingBottom: Layout.space.base
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
  loadingMore: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base,
    backgroundColor: Layout.colors.primary,
    opacity: 0.75,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default memo(SearchJamsList);
