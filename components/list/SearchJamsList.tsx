import { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import JamListItem from "./list-item/JamListItem";
import TextView from "../view/TextView";
import SpinnerView from "../view/SpinnerView";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  data?: any;
  filter?: any;
};

const SearchJamsList = ({ data, filter }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any[]>([]);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'profile-jams', { 
      jamId: JSON.stringify([row?.item?.id]), 
      title: row?.item?.title,
      disableInfiniteScroll: true,
    });
  };

  const renderEmptyMessage = () => {
    if (isLoaded && !currentData?.length) {
      return <TextView>{i18n.t("No results found for this search.")}</TextView>;
    }
  };

  const renderItem = useCallback((row: any) => {
    return (
      <JamListItem
        row={row}
        onListItemPress={(row: any) => onItemPress(row)}
      />
    );
  }, []);

  useEffect(() => {
    if (filter && filter != 'jam') setCurrentData(data.filter((o: any) => o.type == filter))
    else setCurrentData(data);

    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, data, filter]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView 
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={ScreenManager.isWeb() ? true : false}
      style={styles.container} 
    >
      <ListView
        data={currentData}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        renderItem={(row: any) => renderItem(row)}
      />
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
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default SearchJamsList;
