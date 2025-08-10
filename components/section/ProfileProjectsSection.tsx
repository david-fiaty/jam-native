import { StyleSheet } from "react-native";
import JamsList from '../list/JamsList';
import BoxView from '../view/BoxView';
import ProjectsList from "../list/ProjectsList";

type Props = {
  projectId: any;
};

const ProfileProjectsSection = ({ projectId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <ProjectsList idArray={JSON.parse(projectId)} disableInfiniteScroll={true} />
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

export default ProfileProjectsSection;
