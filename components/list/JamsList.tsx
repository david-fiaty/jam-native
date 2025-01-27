import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./JamsList/ListItem";

type Props = BaseProps & {
  searchResult?: any;
};

const JamsList = ({ searchResult }: Props) => {
  const [sectors, setSectors] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!sectors.length) setSectors(await EntityManager.getSectors());
    })();

    setIsLoaded(true);
  }, [isLoaded, sectors]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView 
      direction="column" 
      style={styles.container}
    >
      <ListView
        data={searchResult}
        initialNumToRender={searchResult?.length || 0}
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => <ListItem row={row} sectorsData={sectors} />}
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
