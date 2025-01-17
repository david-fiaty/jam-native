import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./JamsList/ListItem";
import SearchManager from "@/manager/SearchManager";

type Props = BaseProps & {
  idArray?: any,
  showSpinner?: boolean,
};

const JamsList = ({idArray, showSpinner}: Props) => {
  const [jamsData, setJamsData] = useState<any>([]);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        if (idArray?.length > 0) {
          setJamsData(await EntityManager.getJams({ items_ids: idArray }));
        }
        else {
          idArray = SearchManager.getSearchResult('jam');
          if (idArray?.length > 0) setJamsData(await EntityManager.getJams({ items_ids: idArray })); 
          else setJamsData(await EntityManager.listJams());
        }
    
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView direction="column" style={Layout.screenContent}>
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

export default JamsList;
