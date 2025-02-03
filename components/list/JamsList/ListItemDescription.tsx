import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";

type Props = BaseProps & {
  row?: any;
};

const ListItemDescription = ({ row }: Props) => {

  const renderComponent = useCallback(() => {
    return (
      row?.item?.caption?.length > 0 && (
        <BoxView style={styles.container}>
          <TextView>{row?.item?.caption}</TextView>
        </BoxView>
      )
    );
  }, [row]);

  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base*1.2,
  },
});

export default ListItemDescription;
