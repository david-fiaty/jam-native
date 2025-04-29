import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  projectId: any;
};

const ProjectItemSection = ({ projectId }: Props) => {
  projectId = parseInt(projectId);
  
  if (!projectId || isNaN(projectId)) {
    return <></>;
  }

  return (<></>);
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default ProjectItemSection;
