import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import JamForm from "@/components/form/JamForm";

type Props = {
  jamId: any;
};

const JamFormSection = ({ jamId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <JamForm
        isPublic={false}
        jamId={jamId}
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

export default JamFormSection;
