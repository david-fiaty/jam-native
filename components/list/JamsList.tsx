import { useState, useEffect, useRef } from "react";
import { StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import JamView from "../view/JamView";
import SearchManager from "@/manager/SearchManager";
import EntityManager from "@/manager/EntityManager";
import LoadingMoreView from "../view/LoadingMoreView";

type Props = {
  idArray?: any;
}; 

const infiniteScroll: boolean = true;

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

  const getListData = async () => {
    setListData(await EntityManager.getJams(idArray));
  };

  const fetchListData = async () => {
    if (isFetching || !!idArray?.length) return;
    
    setIsFetching(true);
    let moreResults: any[] = await SearchManager.loadMoreResults('jam', currentPage);

    if (!moreResults?.length && infiniteScroll) {
      moreResults = await SearchManager.loadMoreResults('jam', 1);
      setListData((prevData) => [...(prevData || []), ...moreResults]);
      setCurrentPage(2);
    }
    else {
      setListData((prevData) => [...(prevData || []), ...moreResults]);
      setCurrentPage((prevPage: number) => prevPage + 1);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    if (!idArray?.length) {
      if (prevSearchState.current?.currentResults !== searchState.currentResults) {
        setSearchResults(JSON.parse(searchState.currentResults) || {});
        prevSearchState.current = searchState;
      }
    }
  }, [searchState, idArray]);

  useEffect(() => {
    if (!idArray?.length) {
      fetchListData();
      if (!isLoaded) setIsLoaded(true);
    }
    else if (!isLoaded) {
      getListData();
      setIsLoaded(true);
    }
  }, [isLoaded, idArray]);

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
          keyExtractor={(row: any, index?: number) => `${row.id}-${index}`}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={fetchListData}
        />
      </BoxView>

      {isLoaded && isFetching && !!listData?.length && <LoadingMoreView />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default JamsList;
