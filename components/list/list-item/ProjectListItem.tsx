import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import ImageView from "@/components/view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import AddItemButton from "@/components/button/AddItemButton";
import NoImageView from "@/components/view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";
import EntityManager from "@/manager/EntityManager";

type Props = {
  row?: any;
  isAddable?: boolean;
  isDeletable?: boolean;
  isSelected?: boolean;
  multiSelect?: boolean;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
};

const ProjectListItem = ({ row, isAddable, isDeletable, isSelected, multiSelect, onListItemPress, onAddButtonPress }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectImages, setProjectImages] = useState<any>([]);
  
  const numColumns = 3;
  const imageSize = MediaManager.getThumbnailSize();
  multiSelect = typeof multiSelect == 'boolean' ? multiSelect : true;

  const onItemPress = () => {
    if (onListItemPress) {
      onListItemPress(row);
    }
  };

  
  const getProjectImages = async (row: any) => {
    let urlArray: any[] = [];

    if (row.item?.jams?.length > 0) {
      let projectJams: any = await EntityManager.getJams(row.item.jams);

      projectJams.map((o: any) => {
        if (o?.medias?.[0]?.url?.length) {
          urlArray.push(MediaManager.getImageUrl(o.medias[0].url));
        }
      }); 
    }
    
    return urlArray;
  };

  const renderItem = () => {
    let output = null;
    
    if (row?.item?.id == "addItem") {
      output = <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={onAddButtonPress}
      />;
    }
    else if (!projectImages.length) {
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
            uri={projectImages[0]}
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

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectImages(await getProjectImages(row));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, row]);

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
