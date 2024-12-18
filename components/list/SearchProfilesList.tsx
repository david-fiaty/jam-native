import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ListView from "../view/ListView";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import i18n from "@/translation/i18n";

type Props = {
  data?: any,
};

const SearchProfilesList = ({ data }: Props) => {
  const router = useRouter();

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

  return (
    <View>
      {data?.length > 0 && (
        <View style={styles.container}>
          <ListView
            data={data}
            renderItem={(row: any) => renderItem(row)}
            scrollEnabled={false}
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

export default SearchProfilesList;
