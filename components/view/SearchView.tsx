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


const SearchView = () => {
  const [activeTab, setActiveTab] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  //const searchResult = JSON.parse(useSelector((state: any) => state.search.current));

  return <></>;
  
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
      setIsLoaded(true);
  }, [isLoaded, activeTab]);

  if (!isLoaded) return <SpinnerView />;
  
  return (
    <BoxView
      direction="column"
      align="flex-start"
      scroll={true}
      style={[Layout.screenContent, styles.container]}
    >

      {/* Search filters */}
      <BoxView direction="row" align="center" justify="flex-start">
        <ListView
          data={StaticData.searchTabs}
          horizontal={true}
          contentContainerStyle={styles.tabContainer}
          renderItem={(row: any) => renderTab(row)}
        />
      </BoxView>

      {/* Search jams */}
      {['jam'].includes(activeTab) && 
        <SearchJamsList data={searchResult?.jam} />
      }

      {/* Search calls */}
      {['call'].includes(activeTab) && 
        <SearchJamsList data={searchResult?.call} />
      }

      {/* Search jammers */}
      {['jammer'].includes(activeTab) && 
        <SearchProfilesList data={searchResult?.jammer} />
      }

      {/* Search projects */}
      {['project'].includes(activeTab) && 
        <SearchProjectsList data={searchResult?.project} />
      }

      {/* Search events */}
      {['event'].includes(activeTab) && 
        <SearchJamsList data={searchResult?.event} />
      }

      {/* Search venues */}
      {['venue'].includes(activeTab) && 
        <SearchProfilesList data={searchResult?.venue} />
      }

    </BoxView>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  tabContainer: {
    backgroundColor: Colors.white,
  },
  tabItem: {
    paddingHorizontal: Layout.space.base,
    paddingBottom: Layout.space.base,
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Colors.primary,
  },
  activeTab: { 
    fontWeight: "bold",
  },
};

export default SearchView;
