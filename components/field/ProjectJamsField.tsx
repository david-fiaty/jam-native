import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import i18n from "@/translation/i18n";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import AddItemButton from "../button/AddItemButton";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "../view/IconView";

type Props = {
  selectedIds?: any;
  resource?: any;
  canEdit?: boolean;
  onAddButtonPress?: () => void;
  onDeleteButtonPress: (row: any) => void;
};

const ProjectJamsField = ({
  selectedIds,
  resource,
  canEdit,
  onAddButtonPress,
  onDeleteButtonPress
}: Props) => {
  const dispatch = useDispatch();
  const [selectedJams, setSelectedJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectJams, setProjectJams] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const imageSize = MediaManager.getThumbnailSize();
  const numColumns = 3;

  const findItemIndex = (row: any) => {
    return selectedJams.findIndex((id: any) => id == row.item.id);
  };

  const toggleItem = (row: any) => {
    let selectedJamsList: any = [...selectedJams];
    let index: number = findItemIndex(row);

    if (index === -1) selectedJamsList.push(row.item.id);
    else selectedJamsList.splice(index, 1);

    selectedJamsList = selectedJamsList.filter((n: any) => n);
    setSelectedJams(selectedJamsList);
  };

  const renderItem = (row: any) => {
    let isSelected: boolean = findItemIndex(row) !== -1;
    let output = null;

    if (row?.item?.id == "addItem" && canEdit === true) {
      output = (
        <AddItemButton
          label={i18n.t("Add")}
          width={imageSize.width}
          height={imageSize.height}
          onPress={onAddButtonPress}
        />
      );
    } else if (!row?.item?.medias?.[0]?.url) {
      output = (
        <NoImageView
          width={imageSize.width}
          height={imageSize.height}
          rounded={true}
        />
      );
    } else {
      output = (
        <View style={styles.item}>
          <ImageView
            uri={MediaManager.getImageUrl(row.item.medias[0].url)}
            width={imageSize.width}
            height={imageSize.height}
            resizeMode="cover"
            style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
          />

          {isSelected && canEdit === true && (
            <TouchableOpacity
              style={styles.deleteItem}
              onPress={() => onDeleteButtonPress(row)}
            >
              <IconView name="delete" theme="primary" size={12} padding={3.5} />
            </TouchableOpacity>
          )}
        </View>
      );
    }

    if (parseInt(row?.item?.id) > 0) {
      output = (
        <TouchableOpacity key={row.item.id} onPress={() => toggleItem(row)}>
          {output}
        </TouchableOpacity>
      );
    }

    return output;
  };

  useEffect(() => {
    if (selectedIds?.length) {
      EntityManager.getJams({ items_ids: selectedIds }).then((data: any) => {
        data.push({ id: "addItem" });
        setProjectJams(data);
        setIsLoaded(true);
      });
    }
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      {projectJams?.length > 0 && (
        <ListView
          data={projectJams}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          renderItem={(row: any) => renderItem(row)}
        />
      )}
    </View>
  );
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
  link: {
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Colors.primary,
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  deleteItem: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default ProjectJamsField;
