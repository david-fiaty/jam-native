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

const JamsMapView = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const zoomLevel: number = 7;
  const pixelOffset: number = 40;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

  const getInitialRegion = () => {
    let lat: any = Config.defaultLocation.latitude;
    let lng: any = Config.defaultLocation.longitude;

    if (currentLocation?.latitude && currentLocation?.longitude) {
      lat = currentLocation.latitude;
      lng = currentLocation.longitude;
    }

    return { lat: lat, lng: lng };
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

    return { lat: lat, lng: lng };
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

          {selectedPlace && selectedPlace?.id === item.id && (
            <InfoWindow
              position={getMarkerPosition(selectedPlace)}
              onCloseClick={() => setSelectedPlace(null)}
              options={{
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(0, -pixelOffset),
              }}
            >
              {MapManager.renderMarkerCallout(item)}
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

        setInitialRegion(getInitialRegion());
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
        mapContainerStyle={styles.map}
        center={initialRegion}
        zoom={zoomLevel}
        options={{
          //styles: Layout.mapStyle,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {SearchManager.isJamTab(searchState.currentTab) && getTabResults('jam').map((item: any) => renderMarker(item))}
        {SearchManager.isProfileTab(searchState.currentTab) && getTabResults('profile').map((item: any) => renderMarker(item))}
        {SearchManager.isProjectTab(searchState.currentTab) && getTabResults('project').map((item: any) => renderMarker(item))}
      </GoogleMap>

      <MapLegendView />
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
