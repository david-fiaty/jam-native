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
import i18n from "@/translation/i18n";
import SpinnerView from "./SpinnerView";
import FilterToolbarView from "./FilterToolbarView";

const SearchView = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentResults, setCurrentResults] = useState<any>({});
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

  const getCurrentResults = () => {
    let data: any = JSON.parse(searchState.currentResults) || {};

    return data;
  };

  const getTabResults = (key: string) => {
    let tab: string = searchState.currentTab;
    let data: any = {...currentResults};
    
    if (key == 'jam' && tab && tab != 'jam') { 
      data[key] = data[key].filter((o: any) => o.type == tab);
    }
    else if (key == 'profile' && tab && tab != 'jammer') {
      data[key] = data[key].filter((o: any) => o.profile_type == tab);
    }

    return data[key];
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
