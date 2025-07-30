import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./jams-list/ListItem";
import UserManager from "@/manager/UserManager";
import SearchManager from "@/manager/SearchManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  idArray?: any;
  disableInfiniteScroll?: boolean;
};

const JamsList = ({ idArray, disableInfiniteScroll }: Props) => {
  const [sectors, setSectors] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const searchState: any = useSelector((state: any) => state.search);

  const getProfileData = async () => {
    return await UserManager.getProfileData();
  };

  const onListItemAction = async () => {
    setProfileData(await getProfileData());
  };

  const onEndReached = async () => {
    if (Config.infiniteScrollEnabled === true && disableInfiniteScroll !== true) {
      await loadSearchData();
    }
  };

  const renderItem = (row: any) => {
    return (
      <ListItem 
        row={row} 
        sectorsData={sectors} 
        profileData={profileData} 
        onListItemAction={onListItemAction}
      />
    );
  };

  const loadSearchData = () => {
    let data: any[] = SearchManager.getResults()?.jam || [];

    if (Config.infiniteScrollEnabled === true && disableInfiniteScroll !== true) {
      setSearchData(prevData => [...prevData, ...data]);
    }
    else {
      setSearchData(data); 
    }
  };

  useEffect(() => {
    loadSearchData();
    (async () => {
      if (!isLoaded) {
        setSectors(await EntityManager.getSectors());
        setProfileData(await getProfileData());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, sectors, idArray, searchState]);

  if (!isLoaded) return <SpinnerView />;
  
  return (
    <BoxView 
      direction="column" 
      style={styles.container}
    >
      <ListView
        data={searchData}
        contentContainerStyle={Layout.listContainer}
        renderItem={renderItem}        
        keyExtractor={(row: any, index?: number) => `${row.id}-${index}`} 
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached} 
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
