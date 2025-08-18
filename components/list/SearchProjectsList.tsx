import { StyleSheet, Platform } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import ProjectListItem from "./list-item/ProjectListItem";
import TextView from "../view/TextView";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";
import ScreenManager from "@/manager/ScreenManager";

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
    SectionManager.push(router, 'public-project', { 
      projectId: row?.item?.id, 
      title: row?.item?.title 
    });
  };

  const renderItem = (row: any) => {
    return (
      <ProjectListItem
        row={row}
        onListItemPress={(row: any) => onItemPress(row)}
      />
    );
  };

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
      scroll={ScreenManager.isWeb() ? true : false}
      style={styles.container}
    >
      <ListView
        data={currentData}
        numColumns={numColumns}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        emptyMessage={<TextView>{i18n.t('No results available')}</TextView>}
        renderItem={(row: any) => renderItem(row)}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexShrink: 1,
  },
  contentContainerStyle: { 
    gap: Layout.space.base, 
    paddingBottom: Layout.space.base 
  },
  columnWrapperStyle: {
    gap: Layout.space.base,
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
