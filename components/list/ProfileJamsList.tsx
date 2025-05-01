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
import JamListItem from "./ListItem/JamListItem";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  title?: any,
  idArray?: any,
  addButton?: boolean,
  allButton?: boolean,
  isAddable?: boolean;
  isDeletable?: boolean;
  multiSelect?: boolean;
  onAddButtonPress?: () => void,
  onListItemPress?: (row: any) => void;
};

const ProfileJamsList = ({ title, idArray, addButton, allButton, isAddable, isDeletable, multiSelect, onAddButtonPress, onListItemPress }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<any>([]);

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
      router.push({
        pathname: '/jam-item',
        params:  { jamId: row?.item?.id, title: row?.item?.title },
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let jams: any = [];

        if (idArray.length) {
          jams = await EntityManager.getJams({ items_ids: idArray });
        }

        if (addButton === true) {
          jams.push({ id: "addItem" });
        }

        setProfileJams(jams);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray, addButton]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between">
        { title && <TextView style={styles.title}>{title}</TextView> }

        { allButton && (
          <TouchableOpacity
            onPress={() => 
              ScreenManager.pushScreen(router, '/jam', {
                idArray: idArray,
                title: title,
              })
            }
          >
            <TextView underline={true}>{i18n.t("View all")}</TextView>
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
          renderItem={(row: any) => (
            <JamListItem 
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
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default ProfileJamsList;
