import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import UserManager from "@/manager/UserManager";
import EntityManager from "@/manager/EntityManager";
import ListItem from "./JamsList/ListItem";

type Props = BaseProps & {
  idArray?: any,
  showSpinner?: boolean,
};

const JamsList = ({idArray, showSpinner}: Props) => {
  const router = useRouter();
  const [jamsData, setJamsData] = useState<any>([]);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isLoggedIn = UserManager.isLoggedIn();

  useEffect(() => {
    (async () => {
      if (!sectorsData?.length) setSectorsData(await EntityManager.getSectors());
      if (!jamsData?.length && idArray?.length) setJamsData(await EntityManager.getJams({items_ids: idArray}));
      if (!jamsData?.length && !idArray?.length) setJamsData(await EntityManager.listJams());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded && showSpinner) return <SpinnerView />;

  return (
    <BoxView direction="column" style={Layout.screenContent}>
      <ListView
        data={jamsData}
        initialNumToRender={jamsData?.length}
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => <ListItem row={row} />}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base * 1.5,
    borderColor: Colors.primary,
  },
  listItemHeader: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base / 2,
  },
  listItemToolbar: {
    padding: Layout.space.base,
  },
  listItemTitle: {
    padding: Layout.space.base,
    paddingBottom: 0,
  },
  listItemDescription: {
    padding: Layout.space.base,
  },
  listItemCollapsible: {
    padding: Layout.space.base,
  },
  listItemTitleText: {
    fontSize: 16,
  },
  listItemDetails: {
    gap: Layout.space.base,
    width: "100%",
  },
  listItemDetail: {
    width: "100%",
    gap: 0,
    backgroundColor: Colors.secondary,
    padding: Layout.space.base / 6,
    borderRadius: Layout.radius.round,
  },
});

export default JamsList;
