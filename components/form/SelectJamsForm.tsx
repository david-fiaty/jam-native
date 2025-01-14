import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import TextView from "../view/TextView";
import JamListItem from "../list/ListItem/JamListItem";

const SelectJamsForm = () => {
  const dispatch = useDispatch();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [selectedJams, setSelectedJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const idArray: any = activeScreen?.params?.profileJams;
  const resource: string = activeScreen.params.resource;
  const formData: any = useSelector((state: any) => state.form[resource]);
  const numColumns = 3;

  const findItemIndex = (row: any) => {
    return selectedJams.findIndex((id: any) => id == row.item.id);
  };

  const updateSelection = (row: any) => {
    let selectedJamsList = [...selectedJams];
    let index: number = findItemIndex(row);

    if (index === -1) selectedJamsList.push(row.item.id);
    else delete selectedJamsList[index];

    setSelectedJams(selectedJamsList.filter(Boolean));
  };

  const addSelection = () => {    
    dispatch(setFormData<any>({ 
      resource: resource,
      key: 'jams_ids', 
      value: [...(formData?.jams_ids || []), ...selectedJams], 
    }));

    ScreenManager.toggleScreen("SelectJamsForm");
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileJams(await EntityManager.getJams({ items_ids: idArray }))
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, activeScreen, idArray]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BoxView
        align="center"
        justify="space-between"
        direction="row"
        style={styles.titleContainer}
      >
        <BackButton
          title={i18n.t("Select Jams")}
          onPress={() => ScreenManager.toggleScreen("SelectJamsForm")}
        />

        {selectedJams?.length > 0 && (
          <TouchableOpacity onPress={addSelection}>
            <View>
              <TextView style={Layout.textLink}>
                {i18n.t("Add selected")} ({selectedJams.length})
              </TextView>
            </View>
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
              canAddItem={true}
              onListItemPress={(row: any) => updateSelection(row)}
            />
          )}
        />
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
  },
});

export default SelectJamsForm;
