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

type Props = {
  idArray?: any;
  disableInfiniteScroll?: boolean;
};

const JamsList = ({ idArray, disableInfiniteScroll }: Props) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
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
    let results: any = {...searchResults};

    if (idArray?.length > 0) {
      results[key] = results[key].filter((o: any) => idArray.includes(o.id));
    }

    return results[key];
  };

  const fetchListData = async (key: string) => {
    if (!hasMore) return;

    setIsFetching(true);

    let results: any = {...searchResults};
    let moreResults: any = EntityManager.listJams({
      page: currentPage,
    });

    setListData([...results[key], ...moreResults]);
    setCurrentPage((prevPage: number) => prevPage + 1);

    setIsFetching(false);
  };

  const onEndReached = async () => {
    if (Config.infiniteScrollEnabled === true && disableInfiniteScroll !== true) {
      await fetchListData('jam');
    }
  };

  const renderListFooter = () => {
    if (!isFetching) return null;

    return <SpinnerView />;
  };

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});
      setListData(getListData('jam'));

      prevSearchState.current = searchState;
    }
  }, [searchState]);

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
        ListFooterComponent={renderListFooter}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default JamsList;
