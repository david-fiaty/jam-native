import { TouchableOpacity, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import TextView from '@/components/view/TextView';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';

type Props = BaseProps & {
  key?: any;
  item?: any;
};

const ActionListItem = ({ key, item }: Props) => {
  return (
    <TouchableOpacity key={key} onPress={item?.onPress}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.container}>
        <IconView 
          name={item?.icon} 
          theme="tertiary" 
          size={16}
          padding={6}
        />
        <TextView>{item?.label}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.listItem,
    ...{
      padding: Layout.space.base/1.3,
    },
  },
});


export default ActionListItem;
