import { StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import ProjectListItem from "./list-item/ProjectListItem";
import TextView from "../view/TextView";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";

type Props = {
  data?: any;
  filter?: any;
};

const SearchProjectsList = ({ data, filter }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any[]>([]);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'project-item', { projectId: row?.item?.id, title: row?.item?.title });
  };

  const renderEmptyMessage = () => {
    if (isLoaded && !currentData?.length) {
      return <TextView>{i18n.t("No results found for this search.")}</TextView>;
    }
  };

  const renderItem = useCallback((row: any) => {
    return (
      <ProjectListItem
        row={row}
        onListItemPress={(row: any) => onItemPress(row)}
      />
    );
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setCurrentData(data);
        setIsLoaded(true)
      }
    })();
  }, [isLoaded, data]);

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={styles.container}
    >
      <ListView
        data={currentData}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        scrollEnabled={false}
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

export default SearchProjectsList;
