import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import ListItem from "./jams-list/ListItem";
import UserManager from "@/manager/UserManager";

type Props = {
  idArray?: any;
  disableInfiniteScroll?: boolean;
};

const JamsList = ({ idArray, disableInfiniteScroll }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const appState = useSelector((state: any) => state.app);
  const searchState: any = useSelector((state: any) => state.search);
  const userState = useSelector((state: any) => state.user);

  const getProfileData = async () => {
    return await UserManager.getProfileData();
  };

  const onListItemAction = async () => {
    setProfileData(await getProfileData());
  };

  const renderItem = (row: any) => {
    return (
      <ListItem
        row={row}
        sectorsData={sectorsData}
        profileData={profileData}
        onListItemAction={onListItemAction}
      />
    );
  };

  const getListData = () => {
    let currentResults: any [] = JSON.parse(searchState.currentResults)?.jam || [];
    let data: any[] = [];

    if (idArray?.length > 0) {
      data = currentResults.filter((o: any) => idArray.includes(o.id));
    }

    return data;
  };

  /*
  const loadSearchData = () => {
    let data: any[] = SearchManager.getResults()?.jam || [];

    if (Config.infiniteScrollEnabled === true && disableInfiniteScroll !== true) {
      setSearchData(prevData => [...prevData, ...data]);
    }
    else {
      setSearchData(data); 
    }
  };
  */

  /*
  const onEndReached = async () => {
    if (Config.infiniteScrollEnabled === true && disableInfiniteScroll !== true) {
      await loadSearchData();
    }
  };
  */

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(appState.sectorsData);
        setProfileData(userState.profileData);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, appState, userState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      style={styles.container}
    >
      <ListView
        data={getListData()}
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
