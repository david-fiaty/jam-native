import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import ProfileListItem from "./ListItem/ProfileListItem";

type Props = {
  data?: any,
};

const SearchProfilesList = ({ data }: Props) => {
  return (
    <View>
      {data?.length > 0 && (
        <View style={styles.container}>
          <ListView
            data={data}
            scrollEnabled={false}
            emptyMessage={i18n.t("No results found for this search.")}
            renderItem={(row: any) => <ProfileListItem item={row.item} />}
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

export default SearchProfilesList;
