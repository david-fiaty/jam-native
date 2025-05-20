import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";

type Props = {
  row?: any;
};

const ListItemDescription = ({ row }: Props) => {
  return (
    row?.item?.caption?.length > 0 && (
      <BoxView style={styles.container}>
        {row?.item?.title?.length > 0 && <TextView>{row.item.title}</TextView>}
        <TextView>{row?.item?.caption}</TextView>
      </BoxView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base*1.2,
  },
});

export default ListItemDescription;
