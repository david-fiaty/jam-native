import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import JamView from "@/components/view/JamView";
import TextView from "@/components/view/TextView";

type Props = {
  jamId: any;
};

const PrivateJamSection = ({ jamId }: Props) => {
  console.log(jamId)
  return (<TextView>PUBLIC JAM VIEW</TextView>);

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
    >
      <JamView 
        isPublic={true} 
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
