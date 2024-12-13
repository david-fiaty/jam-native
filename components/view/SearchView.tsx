import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import ImageView from "./ImageView";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import ListView from "./ListView";
import DataManager from "@/manager/DataManager";
import SpinnerView from "./SpinnerView";
import MediaManager from "@/manager/MediaManager";
import StaticData from "@/constants/StaticData";
import EntityManager from "@/manager/EntityManager";
import SearchJamsList from "../list/SearchJamsList";

const SearchView = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [activeTab, setActiveTab] = useState<any>(null);
  const [jamsData, setJamsData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>(null);

  const toggleTab = (row: any) => {
    //dispatch(setSearchFilter(row.item.id))
    setActiveTab(row.item.id);
  };

  const renderTab = (row: any) => {
    const tabStyle: any = row.item.id == activeTab ? { fontWeight: "bold" } : {};

    return (
      <TouchableOpacity onPress={() => toggleTab(row)}>
        <View style={styles.tabItem}>
          <TextView style={tabStyle}>{row.item.label}</TextView>
        </View>
      </TouchableOpacity>
    );
  };

  if (!jamsData?.length) {
    EntityManager.listJams().then((data: any) => {
      setJamsData(data);

      console.log(jamsData?.length);
    });
  }

  console.log(activeTab);

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="space-between"
      scroll={true}
      style={Layout.screenContent}
    >
      {/* Tabs */}
      <ListView
        data={StaticData.searchTabs}
        horizontal={true}
        contentContainerStyle={styles.tabContainer}
        renderItem={(row: any) => renderTab(row)}
      />

      {/* Tabs content */}
      <SearchJamsList idArray={[20, 46, 39, 49, 18, 33, 50]} />
    </BoxView>
  );
};

const styles = {
  tabContainer: {
    backgroundColor: Colors.white,
  },
  tabItem: {
    padding: Layout.space.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
    //width: 96.7,
    //height: 96.7,
  },
};

export default SearchView;
