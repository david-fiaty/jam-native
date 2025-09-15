import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow, OverlayViewF } from "@react-google-maps/api";
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

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const places = [
  { id: 1, name: "Marker One", position: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: "Marker Two", position: { lat: 37.7849, lng: -122.4094 } },
];

const JamsMapView = () => {
  const dispatch = useDispatch();
  //const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

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

  const getMarkerPosition = (item: any) => {
    const lat = parseFloat(item?.geolocation_latitude);
    const lng = parseFloat(item?.geolocation_longitude);

    return { lat, lng };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <React.Fragment key={item.id}>
          <OverlayViewF
            position={getMarkerPosition(item)}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -height,
            })}
          >
            <div onClick={() => setSelectedPlace(item)}>
              {MapManager.renderMarker(item)}
            </div>
          </OverlayViewF>

          {selectedPlace?.id === item.id && (
            <InfoWindow
              position={getMarkerPosition(item)}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{'item title'}</h4>
                <p>Custom info here</p>
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        if (!searchState.currentTab) {
          dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
        }

        //setIsLoaded(true);
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
    <View style={[Layout.screenContent, styles.container]}>

      <TabsView
        tabs={searchTabs}
        currentTab={searchState.currentTab}
        onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
      />

      <SearchFiltersView />

      <GoogleMap
        mapContainerStyle={containerStyle}
        //center={center} 
        center={getInitialRegion()}
        zoom={7}
      >
        {SearchManager.isJamTab(searchState.currentTab) && getTabResults('jam').map((item: any) => renderMarker(item))}
        {SearchManager.isProfileTab(searchState.currentTab) && getTabResults('profile').map((item: any) => renderMarker(item))}
        {SearchManager.isProjectTab(searchState.currentTab) && getTabResults('project').map((item: any) => renderMarker(item))}
      </GoogleMap>
    </View>
  );
}

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
