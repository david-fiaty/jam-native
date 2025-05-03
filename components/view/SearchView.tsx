import { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import BoxView from "./BoxView";
import TextView from "./TextView";
import StaticData from "@/constants/StaticData";
import SpinnerView from "./SpinnerView";
import SearchManager from "@/manager/SearchManager";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";

const SearchView = () => {
  const [activeTab, setActiveTab] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search);
  
  const renderTab = (row: any) => {
    const tabStyle: any = row.id == activeTab ? styles.activeTab : {};

    const onTabPress = (tabId: string) => {
      setActiveTab(tabId);
    };

    return (
      <TouchableOpacity 
        key={row.id}
        onPress={() => onTabPress(row.id)} 
        style={styles.tabItem}
      >
        <TextView style={tabStyle}>{row.label}</TextView>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      setSearchData(await SearchManager.getResults());
    })();

    if (!activeTab) setActiveTab(StaticData.searchTabs[0].id);

    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded, searchState]);

  return (
    <>
      {/* Search filters */}
      <BoxView direction="row" align="center" justify="flex-start" style={styles.tabContainer}>
        <ScrollView 
          horizontal={true}
          style={styles.tabContainer}
        >
          {StaticData.searchTabs.map((o: any) => renderTab(o))}
        </ScrollView>
      </BoxView>

      {/* Jams list */}
      {['jam', 'looking', 'call', 'event'].includes(activeTab) && (
        <SearchJamsList 
          data={searchData?.jam}
          filter={activeTab} 
        />
      )}

      {/* Jammers list */}
      {['jammer', 'venue', 'organization', 'personal'].includes(activeTab) && 
        <SearchProfilesList
          data={searchData?.profile}
          filter={activeTab} 
        />
      }

      {/* Projects list */}
      {['project'].includes(activeTab) && 
        <SearchProjectsList
          data={searchData?.project}
          filter={activeTab} 
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
    borderBottomColor: Colors.primary,
  },
  activeTab: { 
    fontWeight: 'bold',
  },
};

export default SearchView;
