import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import TabsView from "./TabsView";
import BoxView from "./BoxView";
import i18n from "@/translation/i18n";
import TextView from "./TextView";

const SearchView = () => {
  const dispatch = useDispatch();
  const searchState: any = useSelector((state: any) => state.search);
  
  const searchTabs: any[] = [
    {
      id: 'jam',
      label: i18n.t('Jams'),
      numColumns: 2,
      default: true,
    },
    {
      id: 'looking',
      label: i18n.t('Lookings'),
      numColumns: 2,
    },
    {
      id: 'call',
      label: i18n.t('Calls'),
      numColumns: 2,
    },
    {
      id: 'event',
      label: i18n.t('Events'),
      numColumns: 2,
    },
    {
      id: 'jammer',
      label: i18n.t('Jammers'),
      numColumns: 1,
    },
    {
      id: 'personal',
      label: i18n.t('Artists'),
      numColumns: 1,
    },
    {
      id: 'organization',
      label: i18n.t('Organization'),
      numColumns: 1,
    },
    {
      id: 'venue',
      label: i18n.t('Venues'),
      numColumns: 2,
    },
    {
      id: 'project',
      label: i18n.t('Projects'),
      numColumns: 2,
    },
  ];

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
      style={Layout.screenContent}
    >
      {/* Search tabs */}
      <TabsView 
        tabs={searchTabs} 
        currentTab={searchState.currentTab} 
        onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
      />

      <BoxView
        direction="row"
        align="center"
        justify="space-between"
        style={styles.searchFilters}
      >
        <TextView>aaa</TextView>
        <TextView>bbb</TextView>
      </BoxView>

      {/* Jams list */}
      {['jam', 'looking', 'call', 'event'].includes(searchState.currentTab) && (
        <SearchJamsList 
          data={(JSON.parse(searchState.currentResults) || [])?.jam}
          filter={searchState.currentTab} 
        />
      )}

      {/* Jammers list */}
      {['jammer', 'venue', 'organization', 'personal'].includes(searchState.currentTab) && 
        <SearchProfilesList
          data={(JSON.parse(searchState.currentResults) || [])?.profile}
          filter={searchState.currentTab} 
        />
      }

      {/* Projects list */}
      {['project'].includes(searchState.currentTab) && 
        <SearchProjectsList
          data={(JSON.parse(searchState.currentResults) || [])?.project}
          filter={searchState.currentTab} 
        />
      }
    </BoxView>
  );
};

const styles = StyleSheet.create({
  searchFilters: {
    width: '100%',
  },
});

export default SearchView;
