import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';

type Props = BaseProps & {
  projectId: any;
};

const ProjectItemView = ({ projectId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }  
    })();
  }, [isLoaded]);

  return (
    <TextView>{projectId}</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProjectItemView;
