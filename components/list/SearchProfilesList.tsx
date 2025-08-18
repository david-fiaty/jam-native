import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import ProfileListItem from "./list-item/ProfileListItem";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";
import ScreenManager from "@/manager/ScreenManager";
import UserManager from "@/manager/UserManager";
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
    SectionManager.push(router, 'public-profile', { 
      profileId: row?.item?.id, 
      title: i18n.t("{{ name }}' s profile", {name: UserManager.getProfileDisplayName(row?.item) }),
    });
  };

  const renderItem = (row: any) => {
    return (
      <ProfileListItem
        row={row}
        onListItemPress={(row: any) => onItemPress(row)}
      />
    );
  };

  useEffect(() => {
    if (filter && filter != 'jammer') setCurrentData(data.filter((o: any) => o.profile_type == filter))
    else setCurrentData(data);

    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, data, filter]);

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
        contentContainerStyle={styles.contentContainerStyle}
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
