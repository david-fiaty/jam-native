import { useState, useEffect } from "react";
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
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  idArray?: any;
};

//const modalSize: any = ScreenManager.getModalSize();

const JamsList = ({ idArray }: Props) => {
  const [sectors, setSectors] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const searchResult = JSON.parse(useSelector((state: any) => state.search.current));

  const renderItem = (row: any) => {
    return <ListItem row={row} sectorsData={sectors} profileData={profileData} />;
  };

  useEffect(() => {
    (async () => {

      if (Array.isArray(idArray) && idArray?.length > 0) {
        setJamData(await EntityManager.getJams({ items_ids: idArray }))
      }
      else {
        setJamData(searchResult?.jam);
      }
    
      if (!isLoaded) {
        setSectors(await EntityManager.getSectors());
        setProfileData(await UserManager.getProfileData());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, sectors, idArray]);

  if (!isLoaded) return <SpinnerView />;
  
  return (
    <BoxView 
      direction="column" 
      style={styles.container}
    >
      <ListView
        data={jamData}
        contentContainerStyle={Layout.listContainer}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base*1.5,
    width: '100%',
    //height: modalSize.height,  
    flexGrow: 1,
  },
});

export default JamsList;
