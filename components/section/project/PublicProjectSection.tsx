import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import ProjectView from "@/components/view/ProjectView";

type Props = {
  projectId: any;
};

const PublicProjectSection = ({ projectId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <ProjectView 
        isPublic={true} 
        projectId={projectId}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

export default PublicProjectSection;
