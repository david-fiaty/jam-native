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
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef();

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

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});

      prevSearchState.current = searchState;
    }
  }, [searchState]);

  return (
    <BoxView
      direction="column"
      style={styles.container}
    >  
      <ListView
        data={getListData('jam')}
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
