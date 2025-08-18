import { TouchableOpacity, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from '@/components/view/TextView';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';

type Props = {
  item?: any;
};

const ActionListItemView = ({ item }: Props) => {
  const onItemPress = () => {
    if (item?.onPress) item.onPress();
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.container}>
        <IconView 
          name={item?.icon} 
          theme="tertiary" 
          size={12}
          padding={6.5}
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


export default ActionListItemView;
