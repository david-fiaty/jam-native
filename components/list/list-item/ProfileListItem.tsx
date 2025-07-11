import { TouchableOpacity, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from '@/components/view/TextView';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import ImageView from "@/components/view/ImageView";
import MediaManager from "@/manager/MediaManager";

const profileImageSize: number = 34;

type Props = {
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

  const getDisplayName = (item: any) => {
    let displayName: string = '';

    if (item?.profile_type == 'personal') {
      displayName = `${item?.profile_personal?.first_name || ''} ${item?.profile_personal?.last_name || ''}`
    }
    else if (item?.profile_type == 'venue') {
      displayName = item?.profile_venue?.venue_name;
    }
    else if (item?.profile_type == 'organization') {
      displayName = item?.profile_organization?.organization_name;
    }

    return displayName.trim().length > 0 ? displayName : item?.profile_name;
  };

  return (
    <TouchableOpacity
      key={row?.item?.id}
      onPress={() => onItemPress(row)}
    >
      <BoxView 
        direction="row" 
        align="center" 
        justify="flex-start" 
        style={styles.container}
      >
        {row?.item?.profile_picture?.url?.length > 0 && (
          <ImageView
            uri={MediaManager.getImageUrl(row.item.profile_picture.url)}
            resizeMode="cover"
            width={profileImageSize}
            height={profileImageSize}
            style={styles.profileImage}
          />
        )}

        {!row?.item?.profile_picture?.url?.length && (
          <IconView
            name="user"
            theme="secondary"
            size={14}
            padding={10}
          />
        )}

        <TextView>{getDisplayName(row?.item)}</TextView>

        {selected &&
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
      padding: Layout.space.base / 1.3,
    },
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize,
  },
});


export default ProfileListItem;
