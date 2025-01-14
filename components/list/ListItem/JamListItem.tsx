import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import i18n from "@/translation/i18n";
import ImageView from "@/components/view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import AddItemButton from "@/components/button/AddItemButton";
import NoImageView from "@/components/view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";

type Props = BaseProps & {
  row?: any;
  canAddItem?: boolean;
  canDeleteItem?: boolean;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
};

const JamListItem = ({ row, canAddItem, canDeleteItem, onListItemPress, onAddButtonPress }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<any>([]);

  const findItemIndex = (row: any) => {
    return selectedIds.findIndex((id: any) => id == row.item.id);
  };

  const updateSelection = (row: any) => {
    let selectedIdsList = [...selectedIds];
    let index: number = findItemIndex(row);

    if (index === -1) selectedIdsList.push(row.item.id);
    else delete selectedIdsList[index];

    setSelectedIds(selectedIdsList.filter(Boolean));
  };

  const onItemPress = (row: any) => {
    if (onListItemPress) {
      onListItemPress(row);
    }

    if (canAddItem || canDeleteItem) updateSelection(row);

      /*
  
    else if (true) {
      console.log('item cliked', row.item.id);
    }
      */



    else {
      router.push({
        pathname: "/jam",
        params: { idArray: [row.item.id], title: row.item.title },
      });
    } 
  };

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;
    let isSelected: boolean = findItemIndex(row) !== -1;
    let imageStyle = (isSelected ? styles.selectedItem : {});

    if (row?.item?.id == "addItem") {
      output = <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={onAddButtonPress}
      />;
    }
    else if (!row?.item?.medias?.[0]?.url) {
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

          {isSelected && (
            <View style={styles.checkIcon}>
              <IconView name="checkmark" theme="primary" size={12} padding={3.5} />
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return output;
  }

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
