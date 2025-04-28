import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import ProjectListItem from "./ListItem/ProjectListItem";
import TextView from "../view/TextView";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  data?: any;
  filter?: any;
};

const SearchProjectsList = ({ data, filter }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [projectsImages, setProjectsImages] = useState<any>({});
  const [currentData, setCurrentData] = useState<any[]>([]);

  const onItemPress = (row: any) => {
    ScreenManager.pushScreen(router, '/project', { idArray: [row.item.id], title: row.item.title });
  };

  useEffect(() => {
    if (data?.length > 0) {
      data.map((item: any) => {
        EntityManager.getProjectImageUrl(item).then((value: any) => {
          if (value && !projectsImages?.[item?.id])
            setProjectsImages({ ...projectsImages, ...{ [item?.id]: value } });
        });
      });

      setCurrentData(data);
    }
  }, [data, filter]);

  return (
    <View>
      <View style={styles.container}>
        <ListView
          data={currentData}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          emptyMessage={<TextView>{i18n.t("No results found for this search.")}</TextView>}
          renderItem={(row: any) => (
            <ProjectListItem
              row={row}
              images={projectsImages}
              onListItemPress={(row: any) => onItemPress(row)}
            />
          )}
        />
      </View>
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

export default SearchProjectsList;
