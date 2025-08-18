import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import ProjectForm from "@/components/form/ProjectForm";

type Props = {
  projectId: any;
};

const ProjectFormSection = ({ projectId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
    >
      <ProjectForm
        isPublic={false}
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

export default ProjectFormSection;
