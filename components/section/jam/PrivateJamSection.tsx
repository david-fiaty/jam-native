import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import JamView from "@/components/view/JamView";

type Props = {
  jamId: any;
};

const PrivateJamSection = ({ jamId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
    >
      <JamView 
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

export default PrivateJamSection;
