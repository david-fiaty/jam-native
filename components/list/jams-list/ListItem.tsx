import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import ListItemHeader from "./ListItemHeader";
import ListItemImage from "./ListItemImage";
import ListItemToolbar from "./ListItemToolbar";
import ListItemCollapsible from "./ListItemCollapsible";

type Props = {
  row?: any;
  sectorsData?: any;
  profileData?: any;
  onListItemAction?: () => void;
};

const ListItem = ({ row, sectorsData, profileData, onListItemAction }: Props) => {
  return (
    <View style={styles.container}>
      <ListItemHeader row={row} />
      <ListItemImage row={row} />
      <ListItemToolbar 
        row={row} 
        profileData={profileData} 
        onListItemAction={onListItemAction}
      />
      <ListItemCollapsible row={row} sectorsData={sectorsData} />
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

export default ListItem;
