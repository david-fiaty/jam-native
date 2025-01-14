import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";
import i18n from "@/translation/i18n";
import TextView from "../view/TextView";
import JamListItem from "./ListItem/JamListItem";

type Props = {
  data?: any,
};

const SearchJamsList = ({ data }: Props) => {
  const numColumns = 3;

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
              <JamListItem 
                row={row}
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

export default SearchJamsList;
