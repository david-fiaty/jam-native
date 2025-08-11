import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import ListItemHeader from "../list/jams-list/ListItemHeader";
import ListItemImage from "../list/jams-list/ListItemImage";
import ListItemToolbar from "../list/jams-list/ListItemToolbar";
import ListItemDetails from "../list/jams-list/ListItemDetails";

type Props = {
  row?: any;
  sectorsData?: any;
  profileData?: any;
  onListItemAction?: () => void;
};

const JamView = ({ row, sectorsData, profileData, onListItemAction }: Props) => {
  return (
    <View style={styles.container}>
      <ListItemHeader row={row} />
      <ListItemImage row={row} />
      <ListItemToolbar 
        row={row} 
        profileData={profileData} 
        onListItemAction={onListItemAction}
      />
      <ListItemDetails row={row} sectorsData={sectorsData} />
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
