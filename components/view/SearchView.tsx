import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import SearchJamsList from "../list/search/SearchJamsList";
import SearchProfilesList from "../list/search/SearchProfilesList";
import SearchProjectsList from "../list/search/SearchProjectsList";
import TabsView from "./TabsView";
import BoxView from "./BoxView";
import SearchFiltersView from "./SearchFiltersView";
import SearchManager from "@/manager/SearchManager";
import DataManager from "@/manager/DataManager";

const SearchView = () => {
  const dispatch = useDispatch();
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const searchTabs: any[] = SearchManager.getSearchTabs();

  const onTabPress = (tabId: string) => {
    dispatch(setCurrentTab(tabId));
  };

  const renderList = (tabId: string) => {
    if (SearchManager.isJamTab(tabId)) {
      return <SearchJamsList key={tabId} />
    }
    else if (SearchManager.isProfileTab(tabId)) {
      return <SearchProfilesList key={tabId} />
    }
    else if (SearchManager.isProjectTab(tabId)) {
      return <SearchProjectsList key={tabId} />
    }
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

      {renderList(searchState.currentTab)}
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
