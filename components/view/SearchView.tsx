import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import TabsView from "./TabsView";
import BoxView from "./BoxView";
import SpinnerView from "./SpinnerView";
import SearchFiltersView from "./SearchFiltersView";
import SearchManager from "@/manager/SearchManager";

const SearchView = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const [searchResults, setSearchResults] = useState<any>({});
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});

      prevSearchState.current = searchState;
    }
  }, [searchState]);

  useEffect(() => {
    if (!isLoaded) {
      if (!searchState.currentTab) {
        dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
      }

      setIsLoaded(true);
    }
  }, [searchState, searchTabs, isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={[styles.container, Layout.screenContent]}
    >
      <TabsView
        tabs={searchTabs}
        currentTab={searchState.currentTab}
        onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
      />
      <SearchFiltersView />
      {SearchManager.isJamTab(searchState.currentTab) && <SearchJamsList />}
      {SearchManager.isProfileTab(searchState.currentTab) && <SearchProfilesList />}
      {SearchManager.isProjectTab(searchState.currentTab) && <SearchProjectsList />}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default SearchView;
