import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import JamListItem from "./ListItem/JamListItem";

type Props = {
  data?: any,
};

const SearchJamsList = ({ data }: Props) => {
  const numColumns = 3;
  const router = useRouter();

  const onItemPress = (row: any) => {
    router.push({
      pathname: "/jam",
      params: { idArray: [row.item.id], title: row.item.title },
    });
  };

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
            emptyMessage={i18n.t("No results found for this search.")}
            renderItem={(row: any) => (
              <JamListItem 
                row={row}
                onListItemPress={(row: any) => onItemPress(row)}
              />
            )}
          />
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

export default SearchJamsList;
