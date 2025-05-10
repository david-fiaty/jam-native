import { useState, useEffect, useCallback } from "react";
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./JamsList/ListItem";
import UserManager from "@/manager/UserManager";
import SearchManager from "@/manager/SearchManager";

type Props = BaseProps & {
  idArray?: any;
};

const JamsList = ({ idArray }: Props) => {
  const [sectors, setSectors] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const searchState: any = useSelector((state: any) => state.search);

  const renderItem = useCallback((row: any) => {
    return <ListItem row={row} sectorsData={sectors} profileData={profileData} />;
  }, [sectors, profileData]);

  useEffect(() => {
    (async () => {
      if (idArray && idArray?.length > 0) setSearchData(await EntityManager.getJams({ items_ids: idArray }))
      else setSearchData((await SearchManager.getResults())?.jam);

      if (!isLoaded) {
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
        onEndReached={() => {
          // Todo - Implement infinite scroll call
        }}
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
