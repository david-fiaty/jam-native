import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import i18n from "@/translation/i18n";
import ImageView from "@/components/view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import AddItemButton from "@/components/button/AddItemButton";
import NoImageView from "@/components/view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";

type Props = BaseProps & {
  row?: any;
  isAddable?: boolean;
  isDeletable?: boolean;
  isSelected?: boolean;
  multiSelect?: boolean;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
};

const ProjectListItem = ({ row, isAddable, isDeletable, isSelected, multiSelect, onListItemPress, onAddButtonPress }: Props) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const numColumns = 3;
  const imageSize = MediaManager.getThumbnailSize();
  multiSelect = typeof multiSelect == 'boolean' ? multiSelect : true;

  const onItemPress = () => {
    if (onListItemPress) {
      onListItemPress(row);
    }
  };

  const renderItem = () => {

    return <TextView>{row?.item?.id}</TextView>;

    let output = null;
    let imageStyle = (isSelected ? styles.selectedItem : {}); // Todo - Is this needed?

    if (row?.item?.id == "addItem") {
      output = <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={onAddButtonPress}
      />;
    }
    else if (!imageUrl || imageUrl == 'undefined') {
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
            uri={imageUrl}
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
        <TouchableOpacity key={row.item.id} onPress={onItemPress}>
          {output}

          {isAddable && isSelected && (
            <View style={styles.checkIcon}>
              <IconView name="checkmark" theme="primary" size={12} padding={3.5} />
            </View>
          )}

          {isDeletable && isSelected && (
            <View style={styles.checkIcon}>
              <IconView name="delete" theme="primary" size={12} padding={3.5} />
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return output;
  }

  return renderItem();
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

export default ProjectListItem;
