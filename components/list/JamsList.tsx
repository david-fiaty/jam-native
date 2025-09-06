import { useState, useEffect, useRef } from "react";
import { StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import JamView from "../view/JamView";

type Props = {
  idArray?: any;
  disableInfiniteScroll?: boolean;
};

const JamsList = ({ idArray, disableInfiniteScroll }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [listData, setListData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef();

  const renderItem = (row: any) => {
    return (
      <JamView
        jamId={row?.item?.id}
        isPublic={false}
      />
    );
  };

  const getListData = (key: string) => {
    let results: any = {};

    if (prevSearchState.current !== searchState) {
      results = JSON.parse(searchState.currentResults) || {};
      setSearchResults(results);
      prevSearchState.current = searchState;
    }
    else {
      results = searchResults;
    }

    if (idArray?.length > 0) {
      results[key] = results[key].filter((o: any) => idArray.includes(o.id));
    }

    return results[key];
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setListData(getListData('jam'));
        setIsLoaded(true);
      }
    })();
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
        //onEndReached={onEndReached}
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
