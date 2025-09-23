import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import TabsView from "./TabsView";
import BoxView from "./BoxView";
import SearchFiltersView from "./SearchFiltersView";
import SearchManager from "@/manager/SearchManager";

const SearchView = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const searchTabs: any[] = SearchManager.getSearchTabs();

  const onTabPress = (tabId: string) => {
    dispatch(setCurrentTab(tabId));
  };
  
  const getListData = async () => {
    setListData(await SearchManager.getListData(1, Config.paginationSize));
  };
  
  useEffect(() => {
    if (!searchState.currentTab) {
      dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
    }
  }, [searchState, searchTabs]);

  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={[Layout.formContainer, styles.container]}
    >
      <TabsView
        tabs={searchTabs}
        currentTab={searchState.currentTab}
        onItemPress={onTabPress}
      />

      <SearchFiltersView />

      {SearchManager.isJamTab(searchState.currentTab) && <SearchJamsList data={listData?.[searchState.currentTab]} />}
      {SearchManager.isProfileTab(searchState.currentTab) && <SearchProfilesList data={listData?.[searchState.currentTab]} />}
      {SearchManager.isProjectTab(searchState.currentTab) && <SearchProjectsList data={listData?.[searchState.currentTab]} />}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexShrink: 1,
    paddingBottom: 0,
  },
});

export default SearchView;
