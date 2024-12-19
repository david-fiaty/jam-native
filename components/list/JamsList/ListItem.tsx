import { StyleSheet, View } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import ListItemHeader from "./ListItemHeader";
import ListItemImage from "./ListItemImage";
import ListItemToolbar from "./ListItemToolbar";
import ListItemTitle from "./ListItemTitle";
import ListItemDescription from "./ListItemDescription";

type Props = BaseProps & {
  row?: any,
};

const ListItem = ({ row }: Props) => {
  return (
    <View style={styles.container}>
      <ListItemHeader row={row} />
      <ListItemImage row={row} />
      <ListItemToolbar row={row} />
      <ListItemTitle row={row} />
      <ListItemDescription row={row} />
      
      {renderItemCollapsible(row)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base * 1.5,
    borderColor: Colors.primary,
  },
});

export default ListItem;
