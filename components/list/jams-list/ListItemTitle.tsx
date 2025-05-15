import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";

type Props = {
  row?: any;
};

const ListItemTitle = ({ row }: Props) => {
  return (
    row?.item?.title?.length > 0 &&
    <BoxView style={styles.container}>
      <TextView style={styles.text}>{row?.item?.title}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.space.base,
    paddingBottom: 0,
  },
  text: {
    fontSize: Layout.fontSize.big,
  },
});


export default ListItemTitle;
