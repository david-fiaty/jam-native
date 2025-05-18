import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./jams-list/ListItem";
import UserManager from "@/manager/UserManager";
import SearchManager from "@/manager/SearchManager";

type Props = {
  idArray?: any;
};

const JamsList = ({ idArray }: Props) => {
  const [sectors, setSectors] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const searchState: any = useSelector((state: any) => state.search);

  const renderItem = (row: any) => {
    return (
      <ListItem 
        row={row} 
        sectorsData={sectors} 
        profileData={profileData} 
      />
    );
  };

  const loadSearchData = async () => {
    let data: any[] = [];
    
    if (idArray && idArray?.length > 0) {
      data = await EntityManager.getJams({ items_ids: idArray });
    }
    else {
      data = (await SearchManager.getResults())?.jam;
    }

    setSearchData(data);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        await loadSearchData();
        setSectors(await EntityManager.getSectors());
        setProfileData(await UserManager.getProfileData());
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
        keyExtractor={(item: any) => item.id.toString()}
        
        // Todo - Implement infinite scroll
        //keyExtractor={(row: any, index?: number) => `${row.id}-${index}`} 
        //onEndReachedThreshold={0.5}
        //onEndReached={async () => await loadSearchData()} 
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',  
    flexGrow: 1,
  },
});

export default JamsList;
