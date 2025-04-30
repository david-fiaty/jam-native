import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import EntityManager from "@/manager/EntityManager";
import ProjectItemView from "../view/ProjectItemView";

type Props = {
  projectId: any;
};

const ProjectItemSection = ({ projectId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);
  projectId = parseInt(projectId);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getJams({ items_ids: [projectId] }))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, projectId]);
  
  if (!projectId || isNaN(projectId)) {
    return <></>;
  }

  return (<ProjectItemView projectId={projectId} />);
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default ProjectItemSection;
