import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";
import ProjectListItem from "./ListItem/ProjectListItem";

type Props = {
  data?: any,
};

const SearchProjectsList = ({ data }: Props) => {
  const numColumns = 3;
  const [projectsImages, setProjectsImages] = useState<any>({});

  useEffect(() => {
    if (data?.length > 0) {
      data.map((item: any) => {
        EntityManager.getProjectImageUrl(item).then((value: any) => {
          if (value && !projectsImages?.[item?.id])
            setProjectsImages({ ...projectsImages, ...{ [item?.id]: value } });
        });
      });
    }
  });

  return (
    <View>
      {data?.length > 0 && (
        <View style={styles.container}>
          <ListView
            data={data}
            numColumns={numColumns}
            contentContainerStyle={{ gap: Layout.space.base }}
            columnWrapperStyle={{ gap: Layout.space.base }}
            scrollEnabled={false}
            renderItem={(row: any) => (
              <ProjectListItem 
                row={row}
                images={projectsImages}
              />
            )}
          />
        </View>
      )}

      {!data?.length && (
        <View style={Layout.borderedListContainer}>
          <TextView>{i18n.t("No results found for this search.")}</TextView>
        </View>
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

export default SearchProjectsList;
