import MapView, { Callout, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import UserManager from "@/manager/UserManager";
import SearchFiltersView from "./SearchFiltersView";
import SearchManager from "@/manager/SearchManager";
import TabsView from "./TabsView";
import MapManager from "@/manager/MapManager";
import MapLegendView from "./MapLegendView";
import TextView from "./TextView";

const JamsMapView = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<any>({});
  const [listData, setListData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();

  const getInitialRegion = () => {
    let latitude: any = Config.defaultLocation.latitude;
    let longitude: any = Config.defaultLocation.longitude;
    let latitudeDelta: any = 0.2;
    let longitudeDelta: any = 0.2;

    if (currentLocation?.latitude && currentLocation?.longitude) {
      latitude = currentLocation.latitude;
      longitude = currentLocation.longitude;
    }

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
  };

  const getTabResults = (key: string) => {
    /*
    let currentPage: number = 1;
    let pageSize: number = 20;

    return SearchManager.loadMoreResults(key, currentPage, searchState.currentTab, pageSize).then((data: any) => {

      console.log(data)
      return data;
    });
    */

    /*
    let results: any = {
      ...searchResults,
      ...{
        [key]: SearchManager.getTabResults(key, searchState.currentTab, searchResults)
      },
    };

    return results[key];
    */
  };

  const getListData = async () => {

    let currentPage: number = 1;
    let pageSize: number = 10;
    let data: any[] = await SearchManager.loadMoreResults('jam', currentPage, searchState.currentTab, pageSize);

    setListData(data);
  };

  const getMarkerPosition = (item: any) => {
    const lat = parseFloat(item?.geolocation_latitude);
    const lng = parseFloat(item?.geolocation_longitude);

    return {
      latitude: lat,
      longitude: lng,
    };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          coordinate={getMarkerPosition(item)}
        >
          {MapManager.renderMarker(item, zoomLevel)}

          <Callout>
            {MapManager.renderMarkerCallout(item)}
          </Callout>
        </Marker>
      );
    }
  };

  const getZoomLevel = (region: any) => {
    let angle = region.longitudeDelta;
    let value = Math.round(Math.log(360 / angle) / Math.LN2);

    return value;
  };

  const onRegionChangeComplete = (region: any) => {
    setZoomLevel(getZoomLevel(region));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        if (!searchState.currentTab) {
          dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
        }

        setIsLoaded(true);
      }

      setCurrentLocation(await UserManager.getLocation());
    })();
  }, [searchState, searchTabs, isLoaded]);

  useEffect(() => {
    getListData();
    if (!isLoaded) setIsLoaded(true);
  
  }, [isLoaded]);

  if (!currentLocation?.latitude || !currentLocation?.longitude || !isLoaded) return <SpinnerView />;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>

        <TabsView
          tabs={searchTabs}
          currentTab={searchState.currentTab}
          onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
        />

        <SearchFiltersView />

        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={getInitialRegion()}
          customMapStyle={Layout.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {listData.map((item: any) => renderMarker(item))}
        </MapView>

        <MapLegendView />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: Layout.space.base,
    width: '100%',
    flexGrow: 1,
    backgroundColor: Layout.colors.white,
  },
  map: {
    flex: 1,
  },
});

export default JamsMapView;
