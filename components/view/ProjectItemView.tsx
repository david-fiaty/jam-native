import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";
import BoxView from "./BoxView";

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

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={styles.container}>
      <TextView>{projectId}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
  },
});

export default ProjectItemView;
