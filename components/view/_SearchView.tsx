import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import StaticData from "@/constants/StaticData";
import SpinnerView from "./SpinnerView";
import SearchManager from "@/manager/SearchManager";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import TabsView from "./TabsView";

const SearchView = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search);
  
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSearchData(await SearchManager.getResults());
        setIsLoaded(true);
      }
    })();

    if (!searchState.currentTab) dispatch(setCurrentTab((StaticData.searchTabs.find((o: any) => o?.default === true))?.id));
  }, [isLoaded, searchState]);

  if (!isLoaded) return <SpinnerView />;
  
  return (
    <>
      {/* Search tabs */}
      <TabsView 
        tabs={StaticData.searchTabs} 
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
    </>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  tabContainer: {
    marginTop: Layout.space.base/2,
    marginBottom: Layout.space.base,
  },
  tabItem: {
    paddingHorizontal: Layout.space.base,
    paddingBottom: Layout.space.base,
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Layout.colors.primary,
  },
  currentTab: { 
    fontWeight: 'bold',
  },
};

export default SearchView;
