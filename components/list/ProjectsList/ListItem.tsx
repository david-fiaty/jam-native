import { StyleSheet, View } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import ListItemHeader from "./ListItemHeader";
import ListItemImage from "./ListItemImage";
import ListItemToolbar from "./ListItemToolbar";
import ListItemTitle from "./ListItemTitle";
import ListItemDescription from "./ListItemDescription";
import ListItemCollapsible from "./ListItemCollapsible";
import TextView from "@/components/view/TextView";

type Props = BaseProps & {
  row?: any,
  sectorsData?: any,
};

const ListItem = ({ row, sectorsData }: Props) => {
  return (
    <View style={styles.container}>
      <TextView>NO DESIGN AVAILABLE FOR PROJECT DETAILS</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base*1.5,
    borderColor: Colors.primary,
    padding: Layout.space.base,
  },
});

export default ListItem;
