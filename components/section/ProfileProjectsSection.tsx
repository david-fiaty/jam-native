import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import EntityManager from "@/manager/EntityManager";
import ProjectItemView from "../view/ProjectItemView";
import SpinnerView from "../view/SpinnerView";

type Props = {
  projectId: any;
};

const ProfileProjectsSection = ({ projectId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);
  projectId = parseInt(projectId);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getJams([projectId]))?.[0]); // Todo - Check project ID is not a bug
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, projectId]);

  if (!isLoaded) return <SpinnerView />;
  
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

export default ProfileProjectsSection;
