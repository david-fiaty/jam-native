import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import ProfileListItem from "./ListItem/ProfileListItem";
import TextView from "../view/TextView";

type Props = {
  data?: any;
  filter?: any;
};

const SearchProfilesList = ({ data, filter }: Props) => {
  const router = useRouter();
  const [currentData, setCurrentData] = useState<any[]>([]);

  useEffect(() => {
    if (filter && filter != 'jammer') setCurrentData(data.filter((o: any) => o.profile_type == filter))
    else setCurrentData(data);
  }, [data, filter]);

  return (      
    <View style={styles.container}>
      <ListView
        data={currentData}
        scrollEnabled={false}
        emptyMessage={<TextView>{i18n.t("No results found for this search.")}</TextView>}
        renderItem={(row: any) => <ProfileListItem item={row.item} />}
      />
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
