import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import JamView from "../view/JamView";
import SearchManager from "@/manager/SearchManager";

type Props = {
  idArray?: any;
};

const JamsList = ({ idArray }: Props) => {
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

  // Todo - Filter by id array
  /*
  const getListData = (key: string) => {
    let results: any = { ...searchResults };

    if (idArray?.length > 0) {
      results[key] = results[key].filter((o: any) => idArray.includes(o.id));
    }

    return results[key];
  };
  */

  const fetchListData = async () => {
    if (isFetching) return;
    setIsFetching(true);

    let moreResults: any[] = await SearchManager.loadMoreResults('jam', currentPage);
    setListData((prevData) => [...(prevData || []), ...moreResults]);

    setCurrentPage((prevPage: number) => prevPage + 1);
    setIsFetching(false);
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

  if (!isLoaded) return <SpinnerView />;

  return (
    <>
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
          onEndReached={fetchListData}
        />
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
    width: '100%',
    height: '100%',
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

export default JamsList;
