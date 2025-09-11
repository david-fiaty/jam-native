import { StyleSheet } from "react-native";
import JamsList from "@/components/list/JamsList";
import BoxView from "@/components/view/BoxView";

type Props = {
  jamId: any;
};

const ProjectJamsSection = ({ jamId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <JamsList idArray={JSON.parse(jamId)} disableInfiniteScroll={true} />
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

export default ProjectJamsSection;
