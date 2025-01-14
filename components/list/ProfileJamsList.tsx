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

type Props = {
  title?: any,
  idArray?: any,
  addButton?: boolean,
  allButton?: boolean,
  onAddButtonPress?: () => void,
};

const ProfileJamsList = ({ title, idArray, addButton, allButton, onAddButtonPress }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
        <TextView style={styles.title}>{title}</TextView>

        { allButton && <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/jam",
              params: { idArray: idArray, title: title },
            })
          }
        >
          <TextView style={Layout.textLink}>{i18n.t("View all")}</TextView>
        </TouchableOpacity> }
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
              onAddButtonPress={onAddButtonPress}
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
