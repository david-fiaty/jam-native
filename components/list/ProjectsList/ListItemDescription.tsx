import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";

type Props = BaseProps & {
  row?: any,
};

const ListItemDescription = ({ row }: Props) => {
  return (
    row?.item?.caption?.length > 0 && (
      <BoxView style={styles.container}>
        <TextView>{row?.item?.caption}</TextView>
      </BoxView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.space.base,
  },
});

export default ListItemDescription;
