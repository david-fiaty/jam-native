import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ListView from "./ListView";
import StaticData from "@/constants/StaticData";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "./SpinnerView";

const SearchView = () => {
  const [activeTab, setActiveTab] = useState<any>(null);
  const [searchData, setSearchData] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchState = useSelector((state: any) => state.search);

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
    if (!activeTab) setActiveTab(StaticData.searchTabs[0].id);

    (async () => {
      if (!searchState.value?.length) {
        setSearchData(await SearchManager.getData());
        setIsLoaded(true);
      } 
      else {
        setSearchData(await SearchManager.getResult(searchState.value));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, searchState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="space-between"
      scroll={true}
      style={Layout.screenContent}
    >
      {/* Search filters */}
      <ListView
        data={StaticData.searchTabs}
        horizontal={true}
        contentContainerStyle={styles.tabContainer}
        renderItem={(row: any) => renderTab(row)}
      />

      {/* Search jams */}
      {['jam'].includes(activeTab) && 
        <SearchJamsList data={searchData?.jam} />
      }

      {/* Search calls */}
      {['call'].includes(activeTab) && 
        <SearchJamsList data={searchData?.call} />
      }

      {/* Search jammers */}
      {['jammer'].includes(activeTab) && 
        <SearchProfilesList data={searchData?.jammer} />
      }

      {/* Search projects */}
      {['project'].includes(activeTab) && 
        <SearchProjectsList data={searchData?.project} />
      }

      {/* Search events */}
      {['event'].includes(activeTab) && 
        <SearchJamsList data={searchData?.event} />
      }

      {/* Search venues */}
      {['venue'].includes(activeTab) && 
        <SearchProfilesList data={searchData?.venue} />
      }

    </BoxView>
  );
};

const styles = {
  tabContainer: {
    backgroundColor: Colors.white,
  },
  tabItem: {
    padding: Layout.space.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  activeTab: { 
    fontWeight: "bold",
  },
};

export default SearchView;
