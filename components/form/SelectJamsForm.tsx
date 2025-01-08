import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import NoImageView from "../view/NoImageView";
import BoxView from "../view/BoxView";
import MediaManager from "@/manager/MediaManager";
import BackButton from "../button/BackButton";
import UserManager from "@/manager/UserManager";
import IconView from "../view/IconView";
import TextView from "../view/TextView";

const toggleItemsForm = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<any>([]);
  const [profileJams, setProfileJams] = useState<any>([]);
  const [selectedJams, setSelectedJams] = useState<any>([]);
  const [profileId, setProfileId] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const formData = useSelector((state: any) => state.form[activeScreen.params.resource]);
  const numColumns = 3;


  const idArray = profileData?.profile_jams;

  const findItemIndex = (row: any) => selectedJams.findIndex((id: any) => id == row.item.id);

  const toggleItem = (row: any) => {
    let selectedJamsList = [...formData?.jams || []];
    let index: number = findItemIndex(row);

    if (index === -1) selectedJamsList.push(row.item.id);
    else delete selectedJamsList[index];

    selectedJamsList = selectedJamsList.filter((n: any) => n);
    setSelectedJams(selectedJamsList);

    /*
    dispatch(setFormData<any>({ 
      key: 'jams', 
      value: selectedJamsList, 
      profile_id: profileId,
    }));
    */
  };

  const deleteItem = (row: any) => {
    let selectedJamsList = [...selectedJams];
    let index: number = findItemIndex(row);
    if (index !== -1) delete selectedJamsList[index];

    setSelectedJams(selectedJamsList.filter((n) => n));
  };

  const renderItem = (row: any) => {
    let imageSize: any = MediaManager.getThumbnailSize();
    let output: any = null;
    let isSelected: boolean = findItemIndex(row) !== -1;
    let imageStyle = (isSelected ? styles.selectedItem : {});

    if (!row?.item?.medias?.[0]?.url) {
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
            style={[
              styles.image,
              ScreenManager.getGridCellSize(numColumns),
              imageStyle,
            ]}
          />

          {isSelected && (
            <TouchableOpacity style={styles.checkItem}>
              <IconView name="checkmark" theme="primary" size={8} />
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
    (async () => {
      if (!isLoaded) {
        let jams: any = await EntityManager.getJams({ items_ids: profileJams });

        console.log(jams);
        setIsLoaded(true);
      }
    })();
  });

  /*
  useEffect(() => {
    (async () => {
      if (!profileData?.length) setProfileData(await UserManager.getProfileData());
      if (profileData && !profileJams?.length) setProfileJams(await EntityManager.getJams({ items_ids: idArray }));
      setIsLoaded(true);
    })();
  });
  */

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
          onPress={() => ScreenManager.toggleModal("AddProjectForm")}
        />

        {selectedJams?.length > 0 && (
          <TouchableOpacity onPress={() => ScreenManager.toggleModal("AddProjectForm")}>
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
          renderItem={(row: any) => renderItem(row)}
        />
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleContainer: {
    width: "100%",
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  selectedItem: {
    opacity: 0.7,
  },
  checkItem: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default toggleItemsForm;
