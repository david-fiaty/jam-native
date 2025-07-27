import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import SpinnerView from "./SpinnerView";
import SearchManager from "@/manager/SearchManager";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import TabsView from "./TabsView";
import BoxView from "./BoxView";
import i18n from "@/translation/i18n";

const SearchView = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>([]);
  const searchState: any = useSelector((state: any) => state.search);
  const prevSearchState: any = useRef(searchState);
  
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
    (async () => {
      if (!isLoaded) {
        setSearchData(await SearchManager.getResults());
        setIsLoaded(true);
      }

      if (prevSearchState.current.searchValue != searchState.searchValue) {
        setSearchData(await SearchManager.getResults()); 
        prevSearchState.current = searchState;
      }
    })();

    if (!searchState.currentTab) {
      dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
    }
  }, [isLoaded, searchState, searchTabs]);

  if (!isLoaded) return <SpinnerView />;
  
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

      {/* Jams list */}
      {['jam', 'looking', 'call', 'event'].includes(searchState.currentTab) && (
        <SearchJamsList 
          data={searchData?.jam}
          filter={searchState.currentTab} 
        />
      )}

      {/* Jammers list */}
      {['jammer', 'venue', 'organization', 'personal'].includes(searchState.currentTab) && 
        <SearchProfilesList
          data={searchData?.profile}
          filter={searchState.currentTab} 
        />
      }

      {/* Projects list */}
      {['project'].includes(searchState.currentTab) && 
        <SearchProjectsList
          data={searchData?.project}
          filter={searchState.currentTab} 
        />
      }
    </BoxView>
  );
};

export default SearchView;
