import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import UserManager from "@/manager/UserManager";
import SearchManager from "@/manager/SearchManager";
import TabsView from "./TabsView";
import SearchFiltersView from "./SearchFiltersView";
import SpinnerView from "./SpinnerView";
import MapManager from "@/manager/MapManager";
import MapLegendView from "./MapLegendView";

const JamsMapView = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});
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
      lat: latitude,
      lng: longitude,
      //latitudeDelta: latitudeDelta,
      //longitudeDelta: longitudeDelta,
    };
  };

  const getTabResults = (key: string) => {
    let results: any = {
      ...searchResults,
      ...{
        [key]: SearchManager.getTabResults(key, searchState.currentTab, searchResults)
      },
    };

    return results[key];
  };

  const getMarkerCoordinate = (item: any) => {
    let latitude: number = parseFloat(item?.geolocation_latitude);
    let longitude: number = parseFloat(item?.geolocation_longitude);

    return {
      latitude,
      longitude,
    };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          position={getMarkerCoordinate(item)}
        >
          {MapManager.renderMarker(item)}
        </Marker>
      );
    }
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
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});

      prevSearchState.current = searchState;
    }
  }, [searchState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <LoadScript googleMapsApiKey={Config.mapApiKey}>
      <TouchableWithoutFeedback>
        <View style={[Layout.screenContent, styles.container]}>

          <TabsView
            tabs={searchTabs}
            currentTab={searchState.currentTab}
            onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
          />

          <SearchFiltersView />

          <GoogleMap
            mapContainerStyle={styles.map}
            center={getInitialRegion()}
            zoom={7}
            options={{
              styles: Layout.mapStyle,
              disableDefaultUI: true,
            }}
          >
            {SearchManager.isJamTab(searchState.currentTab) && getTabResults('jam').map((item: any) => renderMarker(item))}
            {SearchManager.isProfileTab(searchState.currentTab) && getTabResults('profile').map((item: any) => renderMarker(item))}
            {SearchManager.isProjectTab(searchState.currentTab) && getTabResults('project').map((item: any) => renderMarker(item))}
          </GoogleMap>

          <MapLegendView />
        </View>
      </TouchableWithoutFeedback>
    </LoadScript>
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
