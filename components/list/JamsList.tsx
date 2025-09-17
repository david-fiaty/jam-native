import { useState, useEffect, useRef } from "react";
import { StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import JamView from "../view/JamView";
import EntityManager from "@/manager/EntityManager";
import { View } from "react-native-animatable";

type Props = {
  idArray?: any;
  disableInfiniteScroll?: boolean;
};

const JamsList = ({ idArray, disableInfiniteScroll }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);

  const renderItem = (row: any) => {
    return (
      <JamView
        jamId={row?.item?.id}
        itemData={row?.item}
        isPublic={false}
      />
    );
  };

  const getListData = (key: string) => {
    let results: any = { ...searchResults };

    if (idArray?.length > 0) {
      results[key] = results[key].filter((o: any) => idArray.includes(o.id));
    }

    return results[key];
  };

  const fetchListData = async (key: string) => {
    if (!isLoaded) return;

    setIsFetching(true);

    let payload: any = {
      page_size: Config.paginationSize,
      page: currentPage,
    };

    if (!!searchState.searchValue?.length) {
      payload = {
        ...payload,
        ...{
          query_text: searchState.searchValue,
          query_title: searchState.searchValue,
        },
      };
    }

    let moreResults: any = await EntityManager.listJams(payload);

    if (!moreResults?.length) {
      setListData(prevData => [...prevData, ...listData]);
      setCurrentPage(1);
    }
    else {
      setListData((prevData) => [...(prevData || []), ...moreResults]);
      setCurrentPage((prevPage: number) => prevPage + 1);
    }

    setIsFetching(false);
  };

  const onEndReached = async () => {
    if (Config.infiniteScrollEnabled === true && disableInfiniteScroll !== true) {
      await fetchListData('jam');
    }
  };

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});
      prevSearchState.current = searchState;
    }
  }, [searchState]);

  useEffect(() => {
    if (!isLoaded) {
      setListData(getListData('jam'));
      setIsLoaded(true);
    }
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      style={styles.container}
    >
      <ListView
        data={listData}
        contentContainerStyle={Layout.listContainer}
        renderItem={renderItem}
        keyExtractor={(row: any, index?: number) => `${row.id}-${index}`}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />

      {isLoaded && isFetching && (
        <View style={styles.loadingMore}>
          <SpinnerView size="small" />
        </View>
      )}

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loadingMore: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base * 2,
  },
});

export default JamsList;
