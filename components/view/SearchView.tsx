import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ListView from "./ListView";
import StaticData from "@/constants/StaticData";
import SpinnerView from "./SpinnerView";
import SearchManager from "@/manager/SearchManager";
import SearchJamsList from "../list/SearchJamsList";
import DividerView from "./DividerView";
import SearchProfilesList from "../list/SearchProfilesList";

const SearchView = () => {
  const [activeTab, setActiveTab] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search);
  
  const renderTab = (row: any) => {
    const tabStyle: any = row.item.id == activeTab ? styles.activeTab : {};

    return (
      <TouchableOpacity onPress={() => setActiveTab(row.item.id)} style={styles.tabItem}>
        <View>
          <TextView style={tabStyle}>{row.item.label}</TextView>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      setJamData(await SearchManager.getResults());
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
        <ListView
          data={StaticData.searchTabs}
          horizontal={true}
          contentContainerStyle={styles.tabContainer}
          renderItem={(row: any) => renderTab(row)}
        />
      </BoxView>

      {/* Jams list */}
      {['call', 'event'].includes(activeTab) && (
        <SearchJamsList 
          data={jamData}
          filter={activeTab} 
        />
      )}

      {/* Jammers list */}
      {['jammer', 'venue'].includes(activeTab) && 
        { /* <SearchProfilesList data={searchResult?.jammer} /> */ }
      }

      {/* Projects list */}
      {['project'].includes(activeTab) && 
        { /* <SearchProfilesList data={searchResult?.jammer} /> */ }
      }
    </>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  tabContainer: {
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
