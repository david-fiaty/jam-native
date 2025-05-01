import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";

type Props = BaseProps & {
  projectId: any;
};

const ProjectItemView = ({ projectId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getProjects({ items_ids: [projectId] }))?.[0]);
        setIsLoaded(true);
      }  
    })();
  }, [isLoaded, projectId]);

  console.log(projectItem)

  return (
    <TextView>{projectId}</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProjectItemView;
