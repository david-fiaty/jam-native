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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any[]>([]);

  const onItemPress = (row: any) => {
    router.push({
      pathname: '/profile-item',
      params:  { profileId: row?.item?.id, title: row?.item?.title },
    });
  };

  const renderEmptyMessage = () => {
    if (isLoaded && !currentData?.length) {
      return <TextView>{i18n.t("No results found for this search.")}</TextView>;
    }
  };

  useEffect(() => {
    if (filter && filter != 'jammer') setCurrentData(data.filter((o: any) => o.profile_type == filter))
    else setCurrentData(data);

    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, data, filter]);

  return (      
    <View style={styles.container}>
      <ListView
        data={currentData}
        scrollEnabled={false}
        renderItem={(row: any) => (
          <ProfileListItem 
            row={row} 
            onListItemPress={(row: any) => onItemPress(row)}
          />
        )}
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
