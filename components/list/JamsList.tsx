import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./JamsList/ListItem";
import SearchManager from "@/manager/SearchManager";

type Props = BaseProps & {
  idArray?: any;
};

const JamsList = ({ idArray }: Props) => {
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamsData, setJamsData] = useState<any>([]);
  
  useEffect(() => {
    (async () => {
      if (idArray?.length > 0) {
        setSectorsData(await EntityManager.getSectors());
        setJamsData(await EntityManager.getJams({ items_ids: idArray })); 
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView 
      direction="column" 
      style={styles.container}
    >
      <ListView
        data={jamsData}
        initialNumToRender={jamsData?.length}
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => <ListItem row={row} sectorsData={sectorsData} />}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base*1.5,
    paddingBottom: 0,
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
});


export default JamsList;
