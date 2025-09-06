import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import JamView from "@/components/view/JamView";

type Props = {
  jamId: any;
  itemData?: any;
};

const PrivateJamSection = ({ jamId, itemData }: Props) => {
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
        itemData={itemData ? JSON.parse(itemData) : null}
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
