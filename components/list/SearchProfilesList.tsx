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
import IconView from "../view/IconView";

type Props = {
  title?: any;
  idArray?: any;
  addButton?: boolean;
  allButton?: boolean;
  onAddButtonPress?: () => void;
};

const SearchProfilesList = ({
  title,
  idArray,
  addButton,
  allButton,
  onAddButtonPress,
}: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profilesData, setProfilesData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => console.log("clicked")}>
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={Layout.listItem}
      >
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.profile_name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  if (!profilesData?.length) {
    EntityManager.listProfiles().then((data: any) => {
      console.log(data?.length);

      setProfilesData(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  console.log("profiles");

  return (
    <View style={styles.container}>
      {profilesData?.length > 0 && (
        <ListView
          data={profilesData}
          renderItem={(row: any) => renderItem(row)}
          scrollEnabled={false}
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

export default SearchProfilesList;
