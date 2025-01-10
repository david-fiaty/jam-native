import { TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import TextView from '@/components/view/TextView';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';

type Props = BaseProps & {
  item?: any;
};

const ProfileListItem = ({ item }: Props) => {
  return (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{item.profile_name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default ProfileListItem;
