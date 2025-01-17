import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const [searchResultsIds, setSearchResultsIds] = useState<any[]>([]);
  const searchState = useSelector((state: any) => state.search);

  const getSearchResultsIds = async () => {
    let jamResultsIds: any = [];
    let searchValue: string = searchState.value || '';

    if (searchValue.length > 0) {
      let searchResults: any = await SearchManager.getResult(searchValue); 
      jamResultsIds = (searchResults?.jam || []).map((o: any) => o.id);
    }

    return jamResultsIds;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        //if (idArray?.length) setJamsData(await EntityManager.getJams({items_ids: idArray}))
        setJamsData(await EntityManager.listJams())

        setIsLoaded(true);

        //setSearchResultsIds(await getSearchResultsIds());
      }
    })();
  }, [idArray]);

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
