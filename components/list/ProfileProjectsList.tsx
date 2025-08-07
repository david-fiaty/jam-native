import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import ProjectListItem from "./list-item/ProjectListItem";
import SectionManager from "@/manager/SectionManager";

type Props = {
  title?: any;
  idArray?: any;
  addButton?: boolean;
  allButton?: boolean;
  isAddable?: boolean;
  isDeletable?: boolean;
  multiSelect?: boolean;
  emptyMessage?: any;
  onAddButtonPress?: () => void;
  onListItemPress?: (row: any) => void;
};

const ProfileProjectsList = ({
  title,
  idArray,
  addButton,
  allButton,
  isAddable,
  isDeletable,
  multiSelect,
  emptyMessage,
  onAddButtonPress,
  onListItemPress,
}: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profileProjects, setProfileProjects] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [projectsImages, setProjectsImages] = useState<any>({});

  const findItemIndex = (row: any) => {
    return selectedIds.findIndex((id: any) => id == row.item.id);
  };

  const updateSelection = (row: any) => {
    if (multiSelect === true) {
      let selectedIdsList = [...selectedIds];
      let index: number = findItemIndex(row);

      if (index === -1) selectedIdsList.push(row.item.id);
      else selectedIdsList.splice(index, 1);

      setSelectedIds(selectedIdsList);
    }
    else {
      setSelectedIds([row.item.id]);
    }
  };

  const onItemPress = (row: any) => {
    if (onListItemPress) {
      updateSelection(row);
      onListItemPress(row);
    }
    else {
      SectionManager.push(router, 'project-item', {
        projectId: row.item.id,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let projects: any = [];
        let images: any = {};

        console.log(idArray)

        if (idArray.length) {
          projects = await EntityManager.getProjects(idArray);
        }

        (projects || []).map((item: any) => {
          EntityManager.getProjectImageUrl(item).then((value: any) => {
            if (value && !projectsImages?.[item?.id]) images[item.id] = value;
          });
        });

        if (addButton === true) {
          projects.push({ id: "addItem" });
        }
    
        setProfileProjects(projects);
        setProjectsImages(images);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray, addButton, projectsImages]);

  if (!isLoaded) return <SpinnerView size="small" />; 

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between" style={styles.title}>
        { title && <TextView>{title}</TextView> }

        {allButton && (
          <TouchableOpacity onPress={() => {/* Todo - Implement project list */ } }>
            <TextView style={styles.link}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        )}
      </BoxView>

      {isLoaded && !idArray?.length && emptyMessage && <TextView>{emptyMessage}</TextView>}

      {profileProjects?.length > 0 && (
        <ListView
          data={profileProjects}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          renderItem={(row: any) => (
            <ProjectListItem 
              row={row}
              isAddable={isAddable}
              isDeletable={isDeletable}
              multiSelect={multiSelect}
              onAddButtonPress={onAddButtonPress}
              onListItemPress={(row: any) => onItemPress(row)}
              isSelected={(selectedIds.findIndex((id: any) => id == row.item.id)) !== -1}
            />
          )}
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
    borderBottomColor: Layout.colors.primary,
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default ProfileProjectsList;
