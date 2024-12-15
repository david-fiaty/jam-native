import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

type Props = {
  title?: any,
  idArray?: any,
};

const SearchProfilesList = ({ title, idArray }: Props) => {
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
    EntityManager.getProfiles({ items_ids: idArray }).then((data: any) => {
      setProfilesData(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

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
