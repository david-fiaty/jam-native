import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
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
import BackButton from "../button/BackButton";
import UserManager from "@/manager/UserManager";

const SelectJamsForm = () => {
  const numColumns = 3;
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>([]);
  const [profileJams, setProfileJams] = useState<any>([]);
  const [selectedJams, setSelectedJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Todo - Connect to profile jams
  const idArray = [20, 46, 39, 49, 18, 33, 50];

  const selectJam = (row: any) => {
    let selectedJamsList = [...selectedJams];
    let index: number = selectedJamsList.findIndex((id: any) => id == row.item.id);

    if (index === -1) selectedJamsList.push(row.item.id);
    else delete selectedJamsList[index];

    setSelectedJams(selectedJamsList.filter(n => n));
  };

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = null;

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
            style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
          />
        </View>
      );
    }

    if (parseInt(row?.item?.id) > 0) {
      output = (
        <TouchableOpacity
          key={row.item.id}
          onPress={() => selectJam(row)}
        >
          {output}
        </TouchableOpacity>
      );
    }

    return output;
  };

  if (profileData) {
    UserManager.getProfileData().then((data: any) => {
      if (!profileData) setProfileData(data);
    });
  }

  if (profileData && !profileJams?.length) {
    EntityManager.getJams({ items_ids: idArray }).then((data: any) => {
      setProfileJams(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;


  console.log(selectedJams);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t("Select from my Jams")}
        onPress={() => ScreenManager.toggleModal("AddProjectForm")}
      />

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
  image: {
    borderRadius: Layout.space.base,
  },
});

export default SelectJamsForm;
