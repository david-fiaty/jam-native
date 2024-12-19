import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData } from "@/redux/slices/ProjectFormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import AddItemButton from "../button/AddItemButton";
import NoImageView from "../view/NoImageView";
import BoxView from "../view/BoxView";
import MediaManager from "@/manager/MediaManager";
import IconView from "../view/IconView";

type Props = {
  title?: any;
  idArray?: any;
  addButton?: boolean;
  allButton?: boolean;
  onAddEvent?: () => void;
  onDeleteEvent?: (row: any) => void;
};

const ProjectJamsList = ({
  title,
  idArray,
  addButton,
  allButton,
  onAddEvent,
  onDeleteEvent,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [selectedJams, setSelectedJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const projectData = useSelector((state: any) => state.projectForm);
  const numColumns = 3;

  const findItemIndex = (row: any) =>
    selectedJams.findIndex((id: any) => id == row.item.id);

  const toggleItem = (row: any) => {
    let selectedJamsList: any = [...selectedJams];
    let index: number = findItemIndex(row);

    if (index === -1) selectedJamsList.push(row.item.id);
    else delete selectedJamsList[index];

    selectedJamsList = selectedJamsList.filter((n: any) => n);
    setSelectedJams(selectedJamsList);
  };

  const deleteItem = (row: any) => {
    if (onDeleteEvent) onDeleteEvent(row);
  };

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let isSelected: boolean = findItemIndex(row) !== -1;
    let output = null;

    if (row?.item?.id == "addItem") {
      output = (
        <AddItemButton
          label={i18n.t("Add")}
          width={imageSize.width}
          height={imageSize.height}
          onPress={onAddEvent}
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

          {isSelected && (
            <TouchableOpacity
              style={styles.deleteItem}
              onPress={() => deleteItem(row)}
            >
              <IconView name="delete" theme="primary" size={8} />
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
    if (!profileJams?.length && idArray?.length) {
      EntityManager.getJams({ items_ids: idArray }).then((data: any) => {
        if (addButton === true) data.push({ id: "addItem" });
        setProfileJams(data);
        setIsLoaded(true);
      });
    }
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between">
        <TextView style={styles.title}>{title}</TextView>

        {allButton && (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/jam",
                params: { idArray: idArray, title: title },
              })
            }
          >
            <TextView style={styles.link}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        )}
      </BoxView>

      {profileJams?.length > 0 && (
        <ListView
          data={profileJams}
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
    borderBottomWidth: 1,
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

export default ProjectJamsList;
