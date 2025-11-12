import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import ProjectView from "@/components/view/ProjectView";

type Props = {
  projectId: any;
  itemData?: any;
};

const PublicProjectSection = ({ projectId, itemData }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
      scroll={true}
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
