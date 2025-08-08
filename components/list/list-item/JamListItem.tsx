import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import ImageView from "@/components/view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import AddItemButton from "@/components/button/AddItemButton";
import NoImageView from "@/components/view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";

type Props = {
  row?: any;
  isAddable?: boolean;
  isDeletable?: boolean;
  isSelected?: boolean;
  multiSelect?: boolean;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
  onDeleteItemPress?: (row: any) => void;
};

const JamListItem = ({ row, isAddable, isDeletable, isSelected, multiSelect, onListItemPress, onAddButtonPress, onDeleteItemPress }: Props) => {
  const numColumns = 3;
  multiSelect = typeof multiSelect == 'boolean' ? multiSelect : true;

  const onItemPress = (row: any) => {
    if (onListItemPress) {
      onListItemPress(row);
    }
  };

  const deleteItem = (row: any) => {
    if (onDeleteItemPress) {
      onDeleteItemPress(row);
    }
  };

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;

    if (row?.item?.id == "addItem") {
      output = <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={onAddButtonPress}
      />;
    }
    else if (!row?.item?.medias?.[0]?.url || row?.item?.medias?.[0]?.url == 'undefined') {
      output = (
        <View style={styles.item}>
          <NoImageView 
            width={imageSize.width} 
            height={imageSize.height} 
            rounded={true}
          />
        </View>
      );
    }
    else {
      output = (
        <View style={styles.item}>
          <ImageView
            uri={MediaManager.getImageUrl(row.item.medias[0].url)}
            width={imageSize.width}
            height={imageSize.height}
            resizeMode="cover"
            style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
          />
        </View>
      );
    }

    if (parseInt(row?.item?.id) > 0) {
      output = (
        <TouchableOpacity key={row.item.id} onPress={() => onItemPress(row)}>
          {output}

          {isAddable && isSelected && (
            <View style={styles.checkIcon}>
              <IconView name="checkmark" theme="primary" size={12} padding={3.5} />
            </View>
          )}

          {isDeletable && isSelected && (
            <View style={styles.checkIcon}>
              <IconView name="delete" theme="primary" size={12} padding={3.5} onPress={() => deleteItem(row)}/>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return output;
  };

  return renderItem(row);
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginBottom: Layout.space.base,
    flex: 1,
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  selectedItem: {
    opacity: 0.7,
  },
});

export default JamListItem;
