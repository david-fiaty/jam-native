import { TouchableOpacity, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import TextView from '@/components/view/TextView';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';

type Props = BaseProps & {
  row?: any;
  selected?: boolean;
  onListItemPress?: (row: any) => void;
};

const ProfileListItem = ({ row, selected, onListItemPress }: Props) => {
  const onItemPress = (row: any) => {
    if (onListItemPress) {
      onListItemPress(row);
    }
  };

  return (
    <TouchableOpacity 
      key={row?.item?.id} 
      onPress={onItemPress}
    >
      <BoxView direction="row" align="center" justify="flex-start" style={styles.container}>
        <IconView 
          name="user" 
          theme="tertiary" 
          size={16}
          padding={6}
        />
        <TextView>{row?.item?.profile_name}</TextView>
        { selected &&
          <IconView 
            name="checkmark" 
            theme="clear" 
            size={14} 
          />
        }
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


export default ProfileListItem;
