import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import JamViewHeader from "./jam-view/JamViewHeader";
import JamViewImage from "./jam-view/JamViewImage";
import JamViewToolbar from "./jam-view/JamViewToolbar";
import JamViewDetails from "./jam-view/JamViewDetails";

type Props = {
  row?: any;
  sectorsData?: any;
  profileData?: any;
  onListItemAction?: () => void;
};

const JamView = ({ row, sectorsData, profileData, onListItemAction }: Props) => {
  return (
    <View style={styles.container}>
      <JamViewHeader row={row} />
      <JamViewImage row={row} />
      <JamViewToolbar
        row={row} 
        profileData={profileData} 
        onListItemAction={onListItemAction}
      />
      <JamViewDetails row={row} sectorsData={sectorsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base*1.5,
    borderColor: Layout.colors.primary,
  },
});

export default JamView;
