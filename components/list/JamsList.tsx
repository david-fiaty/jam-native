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
import { Config } from "@/constants/Config";

type Props = {
  idArray?: any;
};

const infiniteScroll: boolean = true;

const JamsList = ({ idArray }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);

  const renderItem = (row: any) => {
    return (
      <JamView
        jamId={row?.item?.id}
        isPublic={false}
      />
    );
  };

  const getListData = async () => {
    setListData(await EntityManager.getJams(idArray));
  };

  const fetchListData = async () => {
    if (isFetching || idArray?.length > 0) return;

    setIsFetching(true);
    let moreResults: any[] = await SearchManager.loadResults('jam', currentPage, Config.paginationSize, false);

    if (!moreResults?.length && infiniteScroll) {
      moreResults = await SearchManager.loadResults('jam', 1, Config.paginationSize, false);
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
    (async () => {
      if (!isLoaded) {
        if (idArray?.length > 0) {
          await getListData();
        }
        else {
          await fetchListData();
        }
        
        setIsLoaded(true);
      }
    })();
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
