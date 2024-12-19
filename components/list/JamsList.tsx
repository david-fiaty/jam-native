import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./JamsList/ListItem";

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
      if (!sectorsData?.length) setSectorsData(await EntityManager.getSectors());
      if (!jamsData?.length && idArray?.length) setJamsData(await EntityManager.getJams({items_ids: idArray}));
      if (!jamsData?.length && !idArray?.length) setJamsData(await EntityManager.listJams());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded && showSpinner) return <SpinnerView />;

  return (
    <BoxView direction="column" style={Layout.screenContent}>
      <ListView
        data={jamsData}
        initialNumToRender={jamsData?.length}
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => <ListItem row={row} sectorsData={sectorsData} />}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
    </BoxView>
  );
};

export default JamsList;
