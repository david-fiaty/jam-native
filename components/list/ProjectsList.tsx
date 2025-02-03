import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./ProjectsList/ListItem";

type Props = BaseProps & {
  idArray?: any;
};

const ProjectsList = ({ idArray }: Props) => {
  const [projectsData, setProjectsData] = useState<any>([]);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!sectorsData?.length) setSectorsData(await EntityManager.getSectors());
      if (!projectsData?.length && idArray?.length) setProjectsData(await EntityManager.getProjects({items_ids: idArray}));
      if (!projectsData?.length && !idArray?.length) setProjectsData(await EntityManager.listProjects());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView direction="column" style={Layout.screenContent}>
      <ListView
        data={projectsData}
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => <ListItem row={row} sectorsData={sectorsData} />}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </BoxView>
  );
};

export default ProjectsList;
