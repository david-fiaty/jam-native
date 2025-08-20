import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import TabsView from "./TabsView";
import BoxView from "./BoxView";
import SpinnerView from "./SpinnerView";
import FilterToolbarView from "./FilterToolbarView";
import SearchManager from "@/manager/SearchManager";

const SearchView = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentResults, setCurrentResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search);
  const searchTabs: any[] = SearchManager.getSearchTabs();

  const getCurrentResults = () => {
    let data: any = JSON.parse(searchState.currentResults) || {};

    return data;
  };

  const getTabResults = (key: string) => {
    return SearchManager.getTabResults(key, searchState.currentTab, currentResults);
  };

  useEffect(() => {
    if (!isLoaded) {
      if (!searchState.currentTab) {
        dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
      }

      setCurrentResults(getCurrentResults());
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
      {/* Search tabs */}
      <TabsView
        tabs={searchTabs}
        currentTab={searchState.currentTab}
        onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
      />

      {/* Filter toolbar */}
      <FilterToolbarView />

      {/* Jams list */}
      {['jam', 'looking', 'call', 'event'].includes(searchState.currentTab) && (
        <SearchJamsList
          data={getTabResults('jam')}
        />
      )}

      {/* Jammers list */}
      {['jammer', 'venue', 'organization', 'personal'].includes(searchState.currentTab) &&
        <SearchProfilesList
          data={getTabResults('profile')}
        />
      }

      {/* Projects list */}
      {['project'].includes(searchState.currentTab) &&
        <SearchProjectsList
          data={getTabResults('project')}
        />
      }
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
