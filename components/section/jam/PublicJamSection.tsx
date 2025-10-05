import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import JamView from "@/components/view/JamView";
import JamsList from "@/components/list/JamsList";

type Props = {
  jamId?: any;
  idArray?: any;
  itemData?: any;
};

const PublicJamSection = ({ jamId, idArray, itemData }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
      scroll={true}
    >
      {jamId && (
        <JamView
          isPublic={true}
          jamId={jamId}
          //itemData={itemData}
        />
      )}

      {!!idArray?.length && (
        <JamsList idArray={idArray} />
      )}
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

export default PublicJamSection;
